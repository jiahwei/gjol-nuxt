#!/bin/bash

# 设置错误时退出
set -e

# 显示执行的命令
set -x

# 自动加载 .env.deploy 文件
if [ -f .env.deploy ]; then
  echo "加载 .env.deploy 配置文件..."
  set -a # 自动导出之后的所有变量
  source .env.deploy
  set +a
fi

# 从环境变量读取配置，提供默认值
SERVER_USER="${DEPLOY_SERVER_USER:-deploy}"
SERVER_IP="${DEPLOY_SERVER_IP:-}"
SERVER_PATH="${DEPLOY_SERVER_PATH:-/tmp}"
SSH_KEY="${DEPLOY_SSH_KEY:-~/.ssh/id_rsa}"
IMAGE_TAG="${DEPLOY_IMAGE_TAG:-1.0.0}"
IMAGE_NAME="${DEPLOY_IMAGE_NAME:-gjol-nuxt}"
CONTAINER_NAME="${DEPLOY_CONTAINER_NAME:-gjol-nuxt}"
CONTAINER_PORT="${DEPLOY_CONTAINER_PORT:-3001}"

# 检查必需的环境变量
if [ -z "$SERVER_IP" ]; then
    echo "错误: 请设置 DEPLOY_SERVER_IP 环境变量"
    echo "示例: export DEPLOY_SERVER_IP=your.server.ip"
    exit 1
fi

if [ -z "$SSH_KEY" ] || [ ! -f "$SSH_KEY" ]; then
    echo "错误: SSH密钥文件不存在: $SSH_KEY"
    echo "请设置 DEPLOY_SSH_KEY 环境变量指向正确的SSH密钥文件"
    exit 1
fi

# 显示当前配置
echo "当前配置:"
echo "镜像名称: $IMAGE_NAME"
echo "镜像标签: $IMAGE_TAG"
echo "服务器用户: $SERVER_USER"
echo "服务器IP: $SERVER_IP"
echo "服务器路径: $SERVER_PATH"
echo "SSH密钥: $SSH_KEY"
echo ""

# 确保使用生产环境配置
echo "🚀 Setting up production environment..."
export NODE_ENV=production

# 清理之前的构建
echo "🧹 Cleaning previous builds..."
rm -rf .output
rm -rf .nuxt

# 使用生产环境配置构建
echo "🏗️ Building with production config..."
npx nuxi generate --dotenv .env.production

# 检查生成是否成功
if [ ! -d ".output/public" ]; then
  echo "静态站点生成失败!"
  exit 1
fi

# 构建 Docker 镜像
echo "🐳 Building Docker image..."
docker build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} .

# 保存Docker镜像为tar文件
echo "保存Docker镜像..."
docker save ${IMAGE_NAME}:${IMAGE_TAG} > ${IMAGE_NAME}-${IMAGE_TAG}.tar

# 将Docker镜像传输到服务器
echo "传输Docker镜像到服务器..."
scp -i ${SSH_KEY} ${IMAGE_NAME}-${IMAGE_TAG}.tar ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

# 在服务器上加载并运行容器
echo "在服务器上部署容器..."
ssh -i ${SSH_KEY} ${SERVER_USER}@${SERVER_IP} << EOSSH
  # 加载镜像
  echo "加载镜像..."
  podman load -i ${SERVER_PATH}/${IMAGE_NAME}-${IMAGE_TAG}.tar

  # 停止并删除旧容器（如果存在）
  echo "停止旧容器..."
  podman stop ${CONTAINER_NAME} 2>/dev/null || true
  podman rm ${CONTAINER_NAME} 2>/dev/null || true

  # 运行新容器
  echo "启动新容器..."
  podman run -d --name ${CONTAINER_NAME} \
    -p ${CONTAINER_PORT}:3001 \
    --restart unless-stopped \
    ${IMAGE_NAME}:${IMAGE_TAG}

  # 清理临时文件
  echo "清理临时文件..."
  rm ${SERVER_PATH}/${IMAGE_NAME}-${IMAGE_TAG}.tar

  # 显示容器状态
  echo "容器状态:"
  podman ps | grep ${CONTAINER_NAME}
EOSSH

# 清理本地临时文件
echo "清理本地临时文件..."
rm ${IMAGE_NAME}-${IMAGE_TAG}.tar

echo "部署完成! 网站已在服务器上通过Docker容器运行，端口: ${CONTAINER_PORT}"