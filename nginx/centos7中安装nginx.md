# centos7中安装nginx

本文基于Centos 7下安装配置Nginx操作实践记录整理。

## 1. 在线安装

在Centos下，yum源不提供nginx的安装，可以通过切换yum源的方法获取安装。EPEL是RHEL 的 Fedora 软件仓库，把它添上，你就可以获得 RHEL AS 的高质量、高性能、高可靠性，又需要方便易用（关键是免费）的软件包更新功能。

### 1.1. 配置 EPEL源

```bash
sudo yum install -y epel-release
sudo yum -y update
```



### 1.2. 安装Nginx

```bash
sudo yum install -y nginx
```

安装成功后，默认的网站目录为： /usr/share/nginx/html

默认的配置文件为：/etc/nginx/nginx.conf

自定义配置文件目录为: /etc/nginx/conf.d/



###  1.3. 开放80端口

```bash
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-port=80/tcp --permanent
```



## 2. 下载安装

