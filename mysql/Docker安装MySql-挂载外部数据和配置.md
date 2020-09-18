# Docker安装MySql-挂载外部数据和配置

在Docker中安装Mysql，但存在两个问题：

1、用户密码和字符集等的设置，需要安装完MySql后，进入到MySql中去设置，非常麻烦；
2、配置文件和数据文件都在MySql的容器内，不是很安全。

本文将介绍怎样在创建容器时通过参数的配置来解决上面两个问题。

环境
CentOS：7.4
Docker：1.13.1
MySql：8.0.11
设置环境变量
设置环境变量和镜像的参数，可以来解决第一个问题，环境变量使用-e的方式设置在镜像名称的前面；镜像的参数需要配置在镜像名称的后面

docker run -d -p 4306:3306
-e MYSQL_USER="fengwei"
-e MYSQL_PASSWORD="pwd123"
-e MYSQL_ROOT_PASSWORD="rootpwd123"
--name mysql001
mysql/mysql-server
--character-set-server=utf8
--collation-server=utf8_general_ci
环境变量说明：

-e MYSQL_USER="fengwei"：添加用户fengwei
-e MYSQL_PASSWORD="pwd123"：设置fengwei的密码伟pwd123
-e MYSQL_ROOT_PASSWORD="rootpwd123"：设置root的密码伟rootpwd123

镜像参数说明：

--character-set-server=utf8：设置字符集为utf8
--collation-server=utf8_general_ci：设置字符比较规则为utf8_general_ci

使用SQLyog进行测试，用户名和密码使用上面环境变量中添加的用户fengwei和密码pwd123，出现下图的错误


执行命令进入到容器中的MySql中，执行下面的Sql语句

ALTER USER 'fengwei'@'%' IDENTIFIED WITH mysql_native_password BY 'password123';
再用SQLyog测试，连接成功


上面连接不成功的问题也可以添加镜像参数--default-authentication-plugin=mysql_native_password来解决，完整命令如下

docker run -d -p 4306:3306 
-e MYSQL_USER="fengwei" 
-e MYSQL_PASSWORD="pwd123" 
-e MYSQL_ROOT_PASSWORD="rootpwd123" 
--name mysql001 
mysql/mysql-server 
--character-set-server=utf8 
--collation-server=utf8_general_ci 
--default-authentication-plugin=mysql_native_password 
数据和配置挂载到宿主机
为了安全性，我们应该将数据和配置放到宿主机中，首先执行下面的命令创建data目录和config目录

mkdir mysqltest
cd mysqltest
mkdir data
mkdir config
执行下面命令进入到config目录中，并在该目录中创建my.cnf配置文件

cd config
touch my.cnf
my.cnf配置文件内容如下

[mysqld]
user=mysql
character-set-server=utf8
default_authentication_plugin=mysql_native_password

[client]
default-character-set=utf8

[mysql]
default-character-set=utf8
执行下面命令创建容器

docker run -d -p 4306:3306 
--restart always 
--privileged=true
--name mysql001
-e MYSQL_USER="fengwei" 
-e MYSQL_PASSWORD="pwd123" 
-e MYSQL_ROOT_PASSWORD="rootpwd123"
-v=/mysqltest/config/my.cnf:/etc/my.cnf 
-v=/mysqltest/data:/var/lib/mysql 
mysql/mysql-server
参数说明

--restart always：开机启动
--privileged=true：提升容器内权限
-v=/mysqltest/config/my.cnf:/etc/my.cnf：映射配置文件
-v=/mysqltest/data:/var/lib/mysql：映射数据目录

特别说明

如果没有添加--privileged=true参数，容器创建后不能正常启动，查看日志发现有权限的错误


容器正常创建启动后，可以用客户端工具进行连接测试。

总结和思考
1、不只是MySql，应该是所有涉及到数据和配置的，都不应该放在容器内部。
2、使用-v参数挂接外部数据时，如果data目录已经存在容器能正常启动吗？
3、在docker run命令中添加镜像参数和直接在my.cnf中设置有什么区别？