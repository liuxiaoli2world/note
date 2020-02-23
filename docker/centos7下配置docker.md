# centos7下配置docker.md

## 1.  安装 docker命令

```shell
yum list installed | grep docker

yum install -y docker


```



## 2. 安装docker镜像

[官网查找对应系统版本docker镜像安装命令](https://hub.docker.com/_/centos?tab=tags&page=1>)

```shell
docker pull centos:centos7
```



## 3. 干净的卸载docker

```shell
# 卸载命令
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
# yum
yum list installed | grep docker
# 然后根据上一步列出的卸载

rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
rm -rf /var/run/docker
```

