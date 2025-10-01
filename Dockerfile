FROM node:18-alpine3.18

WORKDIR /app

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 安装serve工具用于提供静态文件服务
RUN npm install -g serve

# 创建非特权用户
RUN addgroup -S nuxtgroup && \
    adduser -S nuxtuser -G nuxtgroup

# 复制整个.output目录
COPY .output/public /app/public

# 设置目录权限
RUN chown -R nuxtuser:nuxtgroup /app

# 切换到非特权用户
USER nuxtuser

# 暴露3001端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3001 || exit 1

# 使用serve启动静态文件服务
CMD ["serve", "-s", "public", "-l", "3001"]