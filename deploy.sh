#!/bin/bash

# 设置错误时退出
set -e

# 显示执行的命令
set -x

# 默认参数
SERVER_USER="root"
SERVER_IP="124.222.26.139"
SERVER_PATH="/tmp"
SSH_KEY="/Users/jingbei/.ssh/TencentClound.pem"
IMAGE_TAG="1.0.0"
IMAGE_NAME="gjol-nuxt"
CONTAINER_NAME="gjol-nuxt"
CONTAINER_PORT="3001"

# 帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo "选项:"
    echo "  -t, --tag TAG         指定镜像标签 (默认: 1.0.0)"
    echo "  -n, --name NAME       指定镜像名称 (默认: gjol-nuxt)"
    echo "  -u, --user USER       指定服务器用户名 (默认: root)"
    echo "  -i, --ip IP           指定服务器IP (默认: 124.222.26.139)"
    echo "  -p, --path PATH       指定服务器上的路径 (默认: /tmp)"
    echo "  -k, --key KEY         指定SSH密钥路径 (默认: /Users/jingbei/.ssh/TencentClound.pem)"
    echo "  -h, --help            显示此帮助信息"
    exit 0
}

# 解析命令行参数
while [[ $# -gt 0 ]]; do
    case "$1" in
        -t|--tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        -n|--name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -u|--user)
            SERVER_USER="$2"
            shift 2
            ;;
        -i|--ip)
            SERVER_IP="$2"
            shift 2
            ;;
        -p|--path)
            SERVER_PATH="$2"
            shift 2
            ;;
        -k|--key)
            SSH_KEY="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo "未知选项: $1"
            show_help
            ;;
    esac
done

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
ssh -i ${SSH_KEY} ${SERVER_USER}@${SERVER_IP} << EOF
  # 加载镜像
  echo "加载镜像..."
  docker load -i ${SERVER_PATH}/${IMAGE_NAME}-${IMAGE_TAG}.tar
  
  # 停止并删除旧容器（如果存在）
  echo "停止旧容器..."
  docker stop ${CONTAINER_NAME} 2>/dev/null || true
  docker rm ${CONTAINER_NAME} 2>/dev/null || true
  
  # 运行新容器
  echo "启动新容器..."
  docker run -d --name ${CONTAINER_NAME} \
    -p ${CONTAINER_PORT}:3001 \
    --restart unless-stopped \
    ${IMAGE_NAME}:${IMAGE_TAG}
  
  # 清理临时文件
  echo "清理临时文件..."
  rm ${SERVER_PATH}/${IMAGE_NAME}-${IMAGE_TAG}.tar
  
  # 显示容器状态
  echo "容器状态:"
  docker ps | grep ${CONTAINER_NAME}
EOF

# 清理本地临时文件
echo "清理本地临时文件..."
rm ${IMAGE_NAME}-${IMAGE_TAG}.tar

echo "部署完成! 网站已在服务器上通过Docker容器运行，端口: ${CONTAINER_PORT}"