# nginx 常用命令和配置

## 1. nginx常用命令，参考[如何启动、停止、重启nginx](https://linuxize.com/post/start-stop-restart-nginx/)

```bash
#
# 查看版本号
nginx -v
##########################使用systemctl############################
# 启动nginx
systemctl start nginx

# 停止nginx
systemctl stop nginx

# 重启nginx
systemctl restart nginx

# 查看nginx状态
systemctl status nginx

# 重新加载nginx
systemctl reload nginx

# 启用开机启动nginx
systemctl enable nginx

# 禁止开机启动ngxin
systemctl disable nginx
#
##########################使用SysVinit  老版本使用############################
# 启动nginx
service nginx start
# 停止nginx
service nginx stop
# 重启nginx
service nginx restart
#
##########################直接通过信号控制#########################
# 启动nginx
/usr/sbin/nginx

# 重新加载nginx
/usr/sbin/nginx -s reload
```



## 2. nginx基本配置

### 2.1 全局

配置服务器整体运行的指令

### 2.2 events

影响服务器与用户的网络连接，比如worker_connections 1024：支持最大的连接数为1024

### 2.3 http

包含两部分：http全局块和server块

