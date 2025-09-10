# 使用官方Nginx镜像作为基础镜像
FROM nginx:alpine

# 设置维护者信息
LABEL maintainer="your.email@example.com"
LABEL description="Personal Blog & Portfolio Website"

# 复制项目文件到Nginx默认目录
COPY . /usr/share/nginx/html/

# 创建自定义Nginx配置
COPY nginx.conf.example /etc/nginx/conf.d/default.conf

# 创建日志目录
RUN mkdir -p /var/log/nginx

# 设置正确的权限
RUN chmod -R 755 /usr/share/nginx/html

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/html/index.html || exit 1

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]


