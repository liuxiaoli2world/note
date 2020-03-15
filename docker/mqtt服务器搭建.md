



# mqtt服务器搭建

## 一、简介
​        MQTT是一个基于客户端-服务器的消息发布/订阅传输协议。MQTT协议是轻量、简单、开放和易于实现的，这些特点使它适用范围非常广泛。在很多情况下，包括受限的环境中，如：机器与机器（M2M）通信和物联网（IoT）。其在，通过卫星链路通信传感器、偶尔拨号的医疗设备、智能家居、及一些小型化设备中已广泛使用。
​        mosquitto一款实现了消息推送协议 MQTT v3.1 的开源消息代理软件，提供轻量级的，支持可发布/可订阅的的消息推送模式，使设备对设备之间的短消息通信变得简单，比如现在应用广泛的低功耗传感器，手机、嵌入式计算机、微型控制器等移动设备。

## 二、Docker安装步骤

### 1、创建目录

```bash
mkdir -p ~/mosquitto/config
mkdir -p ~/mosquitto/data
mkdir -p ~/mosquitto/log
```



### 2、初始化配置文件

```bash
vi /mosquitto/config/mosquitto.conf
```

添加以下配置：
```ini
persistence true
persistence_location /mosquitto/data
log_dest file /mosquitto/log/mosquitto.log
```



### 3、为目录授权

```bash
chmod -R 755 /mosquitto
```



### 4、运行

```bash
docker run -it --name=mosquitto --privileged \
-p 1883:1883 -p 9001:9001 \
-v /mosquitto/config/mosquitto.conf:/mosquitto/config/mosquitto.conf \
-v /mosquitto/data:/mosquitto/data \
-v /mosquitto/log:/mosquitto/log \
eclipse-mosquitto
```



### 5、说明
提示【Error: Unable to open log file /mosquitto/log/mosquitto.log for writing.】
则删了已有的日志文件重新建一个并授权再启动即可。

### 6、配置权限

#### 1）、配置文件添加以下配置

```ini
# 关闭匿名模式
allow_anonymous false

# 指定密码文件
password_file /mosquitto/config/pwfile.conf
```



#### 2）、进入容器

```bash
docker exec -it mqtt-serever sh
```



#### 3）、生成密码

```bash
#对于passworf_file，可以复制一份模板，或者创建一个空文件
touch /mosquitto/config/pwfile.conf
chmod -R 755 /mosquitto/config/pwfile.conf

# 使用mosquitto_passwd命令创建用户，第一个lxy是用户名，第二个lxy是密码
mosquitto_passwd -b /mosquitto/config/pwfile.conf test TEST_2020
```



#### 4）、重启mqtt服务

```bash
docker restart mqtt-server
```



### 7、测试

使用`MQTT.fx`进行连接。

### 1. 配置连接

![image-20200311115114234](D:\learning\note\docker\mqtt服务器搭建.assets\image-20200311115114234.png)

### 2. 连接服务端后，订阅主题

![image-20200311115312221](D:\learning\note\docker\mqtt服务器搭建.assets\image-20200311115312221.png)

### 3. 服务端发送

```bash
# 
docker exec -it mqtt-server sh
# test是主题，啦啦啦啦啦是内容
mosquitto_pub -t test -m '啦啦啦啦啦'
```



### 4. 客户端接收消息

![image-20200311115631290](D:\learning\note\docker\mqtt服务器搭建.assets\image-20200311115631290.png)

