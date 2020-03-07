# centos7下配置docker.md

## 1.  安装 docker

查看本地是否安装`docker`命令：

```shell
yum list installed | grep docker
```

### 1.1 官网安装
https://docs.docker.com/install/linux/docker-ce/centos/

#### 1.1.1 Install required packages. `yum-utils` provides the `yum-config-manager` utility, and `device-mapper-persistent-data` and `lvm2` are required by the `devicemapper` storage driver.

```
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

#### 1.1.2 Use the following command to set up the **stable** repository.

```
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### 1.1.3 Install the *latest version* of Docker Engine - Community and containerd, or go to the next step to install a specific version:

```
$ sudo yum install docker-ce docker-ce-cli containerd.io
```



### 1.2   rpm包下载安装

下载地址：https://download.docker.com/linux/centos/7/x86_64/stable/Packages/

安装 ce,container

### 1.3 阿里云镜像快速安装

```bash
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo service docker start

# 注意：
# 官方软件源默认启用了最新的软件，您可以通过编辑软件源的方式获取各个版本的软件包。例如官方并没有将测试版本的软件源置为可用，您可以通过以下方式开启。同理可以开启各种测试版本等。
# vim /etc/yum.repos.d/docker-ee.repo
#   将[docker-ce-test]下方的enabled=0修改为enabled=1
#
# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# yum list docker-ce.x86_64 --showduplicates | sort -r
#   Loading mirror speeds from cached hostfile
#   Loaded plugins: branch, fastestmirror, langpacks
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            docker-ce-stable
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            @docker-ce-stable
#   docker-ce.x86_64            17.03.0.ce-1.el7.centos            docker-ce-stable
#   Available Packages
# Step2: 安装指定版本的Docker-CE: (VERSION例如上面的17.03.0.ce.1-1.el7.centos)
# sudo yum -y install docker-ce-[VERSION]
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



## 4. 删除docker容器、镜像、卷、数据等

```bash
#停止容器
docker stop $(docker ps -a -q)

#删除容器
docker rm $(docker ps -a -q)

#删除镜像
docker image rm $(docker image ls -a -q)

#删除数据卷：
#docker volume rm $(docker volume ls -q)

#删除 network：
#docker network rm $(docker network ls -q)

#最直接并全面清理的的就是以下命令
#$docker stop $(docker ps -a -q) && docker system prune --all --force
```



## 5.  其他命令

```bash
# 查看文件占用空间
df -hl

# 查看docker所占的硬盘大小
docker system df
```