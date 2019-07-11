# centos 软件安装的方法

## 1.源码安装：

　　需要手动编译。这种软件安装包通常是用gzip压缩过的tar包（后缀为.tar.gz）。

```bash
tar -zxvf filename.tar.gz
```

　　通常在解压缩后产生的文件中，有名为"INSTALL"的文件。该文件为纯文本文件，详细讲述了该软件包的安装方法。

　　对于多数需要编译的软件，其安装的方法大体相同。执行解压缩后产生的一个名为configure的可执行脚本程序。它是用于检查系统是否有编译时所需的库，以及库的版本是否满足编译的需要等安装所需要的系统信息。为随后的编译工作做准备。命令为：

```bash
./configure --prefix=/usr/local/apache2
```

　　--prefix（prefix后面不能留空格）用于指定安装路径，默认安装路径是/usr/local/下的几个文件夹里面，所以一般还是人为指定安装路径比较好，（查找安装路径可以用whereis apache2）。如果检查过程中，发现有错误，configure将给予提示，并停止检查。你可以跟据提示对系统进行配置。再重新执行该程序。检查通过后，将生成用于编译的MakeFile文件。此时，可以开始进行编译了。编译的过程视软件的规模和计算机的性能的不同，所耗费的时间也不同。命令为：

```bash
make
```

　　 成功编译后，键入如下的命令开始安装：

```bash
make install
```

　　安装完毕，应清除编译过程中产生的临时文件和配置过程中产生的文件。键入如下命令：

```bash
make clean
make distclean
```

　　至此，软件的安装结束

## 2.rpm安装：

　　是软件的可执行程序，只要安装它就可以了。这种软件安装包通常被是一个RPM包（Redhat Linux Packet Manager，就是Redhat的包管理器），后缀是.rpm。

　　RPM是Red Hat公司随Redhat Linux推出了一个软件包管理器，通过它能够更加轻松容易地实现软件的安装。

将安装文件拷贝至你的目录中/usr/src。然后使用rpm来安装该文件。命令如下：
　　---- # rpm -ivh filename.i386.rpm
　　---- rpm将自动将安装文件解包，并将软件安装到缺省的目录下。并将软件的安装信息注册到rpm的数据库中。

　　1.安装软件：执行rpm -ivh rpm包名，如：
```bash
rpm -ivh apache-1.3.6.i386.rpm
```

　　2.升级软件：执行rpm -Uvh rpm包名。
　　3.反安装：执行rpm -e rpm包名。
　　4.查询软件包的详细信息：执行rpm -qpi rpm包名
　　5.查询某个文件是属于那个rpm包的：执行rpm -qf rpm包名
　　6.查该软件包会向系统里面写入哪些文件：执行 rpm -qpl rpm包名

## 3.yum安装：

　　通过yum安装的php，是不需要手动配置环境变量的。配置文件目录在/etc/php.ini

　　通过yum安装的apache2，配置文件目录在/etc/httpd/conf/

```bash
rm -f /etc/httpd/conf.d/welcome.conf /var/www/error/noindex.html #删除默认测试页
```



