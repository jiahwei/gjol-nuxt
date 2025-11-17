#!/bin/bash

set -e
set -x

# 加载 .env.deploy（如果存在）
if [ -f .env.deploy ]; then
  set -a
  source .env.deploy
  set +a
fi

# 从环境变量读取配置并设置默认值
RUNTIME="${DEPLOY_RUNTIME:-podman}"
IMAGE_NAME="${DEPLOY_IMAGE_NAME:-gjol-nuxt}"
IMAGE_TAG="${DEPLOY_IMAGE_TAG:-latest}"
CONTAINER_NAME="${DEPLOY_CONTAINER_NAME:-gjol-nuxt}"
CONTAINER_PORT="${DEPLOY_CONTAINER_PORT:-3001}"

echo "部署配置: RUNTIME=$RUNTIME IMAGE_NAME=$IMAGE_NAME IMAGE_TAG=$IMAGE_TAG CONTAINER_NAME=$CONTAINER_NAME CONTAINER_PORT=$CONTAINER_PORT"

# 确认静态构建产物存在
if [ ! -d ".output/public" ]; then
  echo ".output/public 不存在。请确保在 CI 中执行 nuxt generate 以生成静态站点。"
  exit 1
fi

echo "构建镜像..."
${RUNTIME} build -t ${IMAGE_NAME}:${IMAGE_TAG} .

echo "停止并删除旧容器（如果存在）..."
${RUNTIME} stop ${CONTAINER_NAME} 2>/dev/null || true
${RUNTIME} rm ${CONTAINER_NAME} 2>/dev/null || true

echo "启动新容器..."
${RUNTIME} run -d --name ${CONTAINER_NAME} \
  -p ${CONTAINER_PORT}:3001 \
  --restart unless-stopped \
  ${IMAGE_NAME}:${IMAGE_TAG}

echo "容器状态:"
${RUNTIME} ps | grep ${CONTAINER_NAME} || true

echo "部署完成"