# nginx 反向代理配置

背景：centos7中安装docker，docker中运行apache容器和nginx容器

## 1. 环境准备

```bash
# 拉取nginx镜像
docker pull nginx:1.16.1
# 拉取tomcat镜像
docker pull tomcat:8.5
# 查看本地docker镜像
docker images

# 创建并运行nginx容器
docker run -d --name nginx -p 8000:8080 -v $PWD/nginx/home:/home nginx:1.16.1

# 创建并运行tomcat容器1
docker run -d --name tomcat-container-1 -p 8081:8000 -v $PWD/tomcat1/html:/usr/local/tomcat/webapps/test tomcat:8.5

# 创建并运行tomcat容器2
docker run -d --name tomcat-container-2 -p 8081:8000 -v $PWD/tomcat2/html:/usr/local/tomcat/webapps/test tomcat:8.5
```

镜像拉取后如下图所示：

![image-20200308125520954](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308125520954.png)

容器启动完后如下图所示：

![image-20200308125609143](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308125609143.png)

本地分别访问3个容器：

![image-20200308125423431](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308125423431.png)

![image-20200308125737717](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308125737717.png)



![image-20200308125836260](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308125836260.png)

`tomcat` 容器启动后访问报404错误，是因为`webapps`中没有内容，需要进入容器内部，把`webapps.dist`移动到`webapps`下即可。

## 2. 反向代理配置

修改nginx容器中配置文件的映射关系

```bash
# 进入到docker的容器目录下
cd /var/lib/docker/containers
# 进入到指定容器（通过id）
cd containerid
# 添加hostconfit.json中"Binds"值
vi hostconfig.json
```

![image-20200308131439458](D:\learning\note\docker\nginx反向代理配置.assets\image-20200308131439458.png)

## 3. 负载均衡配置



