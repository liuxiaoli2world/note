# git升级

CentOS 自带的git版本太低，需要升级到2.1.2版本以上才能使用gitea。

升级步骤：

卸载旧版本

```bash
yun remove git
```

安装所需软件包

```bash
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel 
yum install gcc perl-ExtUtils-MakeMaker
```

下载&安装

```bash
cd /usr/src
wget https://www.kernel.org/pub/software/scm/git/git-2.7.3.tar.gz 
tar xzf git-2.7.3.tar.gz
cd git-2.7.3
make prefix=/usr/local/git all
make prefix=/usr/local/git install
```

创建软连接

```bash
cd /usr/bin
ln -s  /usr/local/git/bin/git git
```

检查版本

```bash
git --version
```

执行make prefix=/usr/local/git all时，可能会报错：make: * [git-credential-store] Error 1，此时可以使用以下命令代替：

```bash
./configure --without-iconv
make CFLAGS=-liconv prefix=/usr/local/git all
make CFLAGS=-liconv prefix=/usr/local/git install
```

另一个版本（未尝试，可能不全面，没有安装依赖。配置有待参考）：

```bash
# 卸载旧版本
yum remove git
# 下载git2.2.1并将git添加到环境变量中
wget https://github.com/git/git/archive/v2.2.1.tar.gz
tar zxvf v2.2.1.tar.gz
# 进入目录，编译安装
cd git-2.2.1
make configure
./configure --prefix=/usr/local/git --with-iconv=/usr/local/libiconv
make all doc
make install install-doc install-html
echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
source /etc/bashrc
```

有些应用可能还需要自己配置环境变量，只有这样才能对应用中所提供的命令行命令进行直接使用。对于环境变量的配置可以使用export命令做临时的配置，也可以直接写入/etc/bashrc中，然后再source /etc/bashrc，完成永久配置。
其中etc/bashrc这个文件还涉及到了其他的环境变量配置文件。