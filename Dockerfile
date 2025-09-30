FROM node:22-bookworm-slim

WORKDIR /app

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 安装serve工具用于提供静态文件服务
RUN npm install -g serve

# 创建非特权用户 - Debian 语法
RUN groupadd -r nuxtgroup && \
    useradd -r -g nuxtgroup nuxtuser

# 复制整个.output目录
COPY .output/public /app/public

# 设置目录权限
RUN chown -R nuxtuser:nuxtgroup /app

# 切换到非特权用户
USER nuxtuser

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["serve", "-s", "public", "-l", "3001"]