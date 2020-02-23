# 安装zsh

目录

- 1 切换到zsh
  - [1.1 查看系统当前的shell](https://www.cnblogs.com/redirect/p/7776540.html#查看系统当前的shell)
  - [1.2 查看bin下是否有zsh包](https://www.cnblogs.com/redirect/p/7776540.html#查看bin下是否有zsh包)
  - [1.3 安装zsh包](https://www.cnblogs.com/redirect/p/7776540.html#安装zsh包)
  - [1.4 切换shell至zsh](https://www.cnblogs.com/redirect/p/7776540.html#切换shell至zsh)
- 2 安装oh-my-zsh
  - [2.1 oh-my-zsh源码是放在github上的，所以先要安装git](https://www.cnblogs.com/redirect/p/7776540.html#oh-my-zsh源码是放在github上的所以先要安装git)
  - 2.2 修改配置
    - [2.2.1 修改主题](https://www.cnblogs.com/redirect/p/7776540.html#修改主题)
    - [2.2.2 修改插件](https://www.cnblogs.com/redirect/p/7776540.html#修改插件)
- [3 使用技巧](https://www.cnblogs.com/redirect/p/7776540.html#使用技巧)

**为何要换成zsh，主要是两点吧**

```
1. 界面更漂亮，换一种心情  
2. 更高级的功能，提高效率  
```

# 1 切换到zsh

使用root用户登录，下面的操作基本都没有root的困扰，如果非root用户请切换至root用户操作。

## 1.1 查看系统当前的shell

echo $SHELL
返回结果如下：
`/bin/bash`
默认的shell一般都是bash

## 1.2 查看bin下是否有zsh包

cat /etc/shells
返回结果如下：

```
/bin/sh
/bin/bash
/sbin/nologin
/bin/dash
/bin/tcsh
/bin/csh
```

默认没有安装zsh

## 1.3 安装zsh包

```
yum -y install zsh
```

安装完成后查看shell列表
`cat /etc/shells`

返回结果如下：

```
/bin/sh
/bin/bash
/sbin/nologin
/bin/dash
/bin/tcsh
/bin/csh
/bin/zsh
```

## 1.4 切换shell至zsh

```
chsh -s /bin/zsh
```

返回结果：
`Changing shell for root.`
`Shell changed.`

按提示所述，shell已经更改为zsh了，现在查看一下系统当前使用的shell，
`echo $SHELL`
返回结果如下：
`/bin/bash`
重启过后，使用代码查看当前使用的shell
`echo $SHELL`
返回结果：
`/bin/zsh`

得到如此结果，证明shell已经切换成功了。

# 2 安装oh-my-zsh

## 2.1 oh-my-zsh源码是放在github上的，所以先要安装git

命令如下：
`yum -y install git`
`wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh`

如果显示如下界面表示成功：

```
         __                                     __   
  ____  / /_     ____ ___  __  __   ____  _____/ /_  
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \ 
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / / 
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/  
                        /____/                       ....is now installed!
Please look over the ~/.zshrc file to select plugins, themes, and options.

p.s. Follow us at https://twitter.com/ohmyzsh.

p.p.s. Get stickers and t-shirts at http://shop.planetargon.com.
```

## 2.2 修改配置

主要是修改 文件 ~/.zshrc

### 2.2.1 修改主题

~/.oh-my-zsh/themes文件夹下有主题的列表

样式参考 https://github.com/robbyrussell/oh-my-zsh/wiki/Themes

推荐

```shell
ZSH_THEME='ys'  
ZSH_THEME='agnoster'
```

### 2.2.2 修改插件

~/.oh-my-zsh/plugins文件夹下有可用的插件列表

更换Plugin

```shell
plugins=(git z extract)
git  显示git信息  
z    可以用来快速跳转  
extract 解压文件插件，所有的文件直接 x filename 即可，不用再记忆各类参数
```

修改完后，如果需要在当前shell中生效，需要执行

```shell
source ~/.zshrc
```

**还可以自己下载插件**

安装zsh-syntax-highlighting插件

同样地，我们要先下载它的源码，但在这里，我们可以利用一下oh-my-zsh的插件管理功能：

```shell
    cd ~/.oh-my-zsh/custom/plugins
    git clone git://github.com/zsh-users/zsh-syntax-highlighting.git
```

然后，我们打开~/.zshrc文件，找到以下段落；

```
    # Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
    # Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
    # Example format: plugins=(rails git textmate ruby lighthouse)
    # Add wisely, as too many plugins slow down shell startup.
    plugins=(git)
```

按照注释中的提示改成`plugins=(git zsh-syntax-highlighting)`即可。

# 3 使用技巧

```
  1. 连按两次Tab会列出所有的补全列表并直接开始选择，补全项可以使用 ctrl+n/p/f/b上下左右切换
  2. 命令选项补全。在zsh中只需要键入 tar -<tab> 就会列出所有的选项和帮助说明
  3. 命令参数补全。键入 kill <tab> 就会列出所有的进程名和对应的进程号
  4. 更智能的历史命令。在用或者方向上键查找历史命令时，zsh支持限制查找。比如，输入ls,然后再按方向上键，则只会查找用过的ls命令。而此时使用则会仍然按之前的方式查找，忽略 ls
  5. 多个终端会话共享历史记录
  6. 智能跳转，安装了 autojump 之后，zsh 会自动记录你访问过的目录，通过 j 目录名 可以直接进行目录跳转，而且目录名支持模糊匹配和自动补全，例如你访问过 hadoop-1.0.0 目录，输入j hado 即可正确跳转。j --stat 可以看你的历史路径库。
  7. 目录浏览和跳转：输入 d，即可列出你在这个会话里访问的目录列表，输入列表前的序号，即可直接跳转。
  8. 在当前目录下输入 .. 或 ... ，或直接输入当前目录名都可以跳转，你甚至不再需要输入 cd 命令了。在你知道路径的情况下，比如 /usr/local/bin 你可以输入 cd /u/l/b 然后按进行补全快速输入
  9. 通配符搜索：ls -l **/*.sh，可以递归显示当前目录下的 shell 文件，文件少时可以代替 find。使用 **/ 来递归搜索
  10. 扩展环境变量，输入环境变量然后按 就可以转换成表达的值
  11. 在 .zshrc 中添加 setopt HIST_IGNORE_DUPS 可以消除重复记录，也可以利用 sort -t ";" -k 2 -u ~/.zsh_history | sort -o ~/.zsh_history 手动清除
```

卡顿现象，发现每次执行命令都要运行git 检查status信息,可以使用下面命令

关闭

```shell
git config --global oh-my-zsh.hide-status 1  
```

打开

```shell
git config --global oh-my-zsh.hide-status 0  
# root @ WENGINE in /var/www/html on git:feature-apply_config x [13:32:48] 
$ git config --global oh-my-zsh.hide-status 1

# root @ WENGINE in /var/www/html [13:33:24] 
$ git config --global oh-my-zsh.hide-status 0

# root @ WENGINE in /var/www/html on git:feature-apply_config x [13:33:33] 
$ 
```