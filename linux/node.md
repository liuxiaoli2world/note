# nodejs安装

[参考](https://blog.csdn.net/qq_21794603/article/details/68067821)

## 1.安装nodejs
访问nodejs的官方网站的downdolad，网址：https://nodejs.org/en/download/，可以看到最新的nodejs下载，包括不同的版本。 

根据linux的不同版本选择32位或64位，因为我的linux的虚拟机是64位的，所以我选择的是64位二进制安装文件（Linux Binariesx64)，可以右键选择在新窗口中打开链接，记下这个地址。https://nodejs.org/dist/v6.10.1/node-v6.10.1-linux-x64.tar.xz； 回到linux虚拟机，在控制台输入 

```shell
wget https://nodejs.org/dist/v6.10.1/node-v6.10.1-linux-x64.tar.xz 
```

系统将会下载这个文件，可以选择下载到默认路径。成功下载，在命令行输入  `ls` 命令可以查看到文件。如下图所示。 

根据下载的文件可以看出它的压缩方式是.xz的方式，所以不能直接使用linux命令tar直接下载。需要下载能够解压这种格式的工具。我们可以使用yum源来安装，控制台命令：

```shell
# yum search xz
# yum install xz.i386
# xz -d node-v6.10.1-linux-x64.tar.xz
# tar -xf node-v6.10.1-linux-x64.tar
# mv node-v6.10.1-linux-x64 node-v6.10.1
```


在控制台输入 `yum search xz`，在搜索到的列表中选择安装软件，如 `yum install xz.i386`，解压完成后文件变为以.tar后缀，使用 `tar -xf node-v6.10.1-linux-x64.tar` 解压文件。 
可以更改文件名方便操作，在命令台输入 `mv node-v6.10.1-linux-x64 node-v6.10.1` ，更改文件名为node-v6.10.1。 
为了验证是否能够使用node，我们可以输入 `cd node-v6.10.1/bin` ，输入 `./node -v` 查看node版本，安装成功则能够成功显示node版本。 

##  2.配置nodejs
  要想node能够在全局能够使用，需要添加连接，在控制台输入下面命令能够实现。其中“/root/node-v6.10.1/bin/node”为二进制nodejs文件的目录，根据上面的步骤，我这里是直接解压到了root目录下，所以路径为/root/node-v6.10.1/bin/node。

```bash
ln -s /root/node-v6.10.1/bin/node /usr/local/bin/node  

ln -s /root/node-v6.10.1/bin/npm /usr/local/bin/npm
```

配置完成后即可在任何目录下使用node。 