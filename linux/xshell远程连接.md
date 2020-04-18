# 对xshell三种端口转发的认识

------

工作中经常会遇到一些服务器访问受限的问题：某些服务器只有私网ip地址，仅能通过内网ip连接，或如mysql服务器或登录其它机器的ssh。

这些问题当然许多解决办法，本文就使用'[xshell](http://www.freeoa.net/product/apptool/xshell_1900.html)'通过ssh开启代理的方式来解决这个问题，恻重介绍其内置的三种方式：
**Local(Outgoing)
Remote(Incoming)
Dynamic(SOCKS4/5)**

如何打开代理设置面板
点击：view -> Tunneling Pane，在弹出的窗口选择Forwarding Rules。
Alt+p：'Connection->SSH->Tunneling'。

从'Add...'按钮或右键菜单即可添加。

**一、Local**
把远程服务器到本机的端口映射。多于访问那些侦听的回环地址的服务，或位于防火墙后面，或没有公网ip的服务。
Type选择"Local(Outgoing)"，'Source Host'使用默认的'localhost'，'Listen Port'添上mysql的端口3306；


'Destination Host'使用默认的localhost，'Destination Port'添上3306；

Descripting根据自己需要进行描述，可以留空。配置完成后点击'OK'会弹出一个对话框，点击是的话会对当前会话进行保存，以后每次连接此ssh会话，开启此端口转发，可自行决定是否保存。

添加完成后在'Forwarding Rules'对话框可以看到框中有一行转发配置，确保Status的状态是'Open'，如果显示的是'Failed'可能是3306这个本地端口已经被占用了，可以尝试将'Listen Port'修改为其它端口进行重新设置。

至此，xshell已经将服务器的3306端口映射到本地3306端口，可以通过工具进行测试。只需要连接'localhost'或'127.0.0.1'(或本机的其它ip)的3306端口即可连上mysql，默认能访问到本机的所有ip的机器(同一局域网)及端口(本机防火墙已关闭的情况下)就能访问远程的mysql服务器；如果仅让本机可连，可将'Accept local connections only'这样的选项勾上，这样更安全一些(这种仅能从本机连接的方式同样适用于其它两种模式，下面不做多述)。

在Type选择"Local(Outgoing)"的时候，'Source Host'表示使用的本地ip地址，可以是localhost也可以是本地内网ip或者公网ip，使用相应的ip便可以被本地网络的用户访问到，比如上例中，如果需要同ip段的同事访问3306的端口管理服务器，便可以设置成他可以访问到的那个ip地址。

'Destination Host'表示服务器端的ip地址，可以是服务器本地的地址localhost或者是服务器可以访问到的一个ip地址，例如服务器同机房的某个ip，或者服务器可以连接公网的话，可以是公网上某台服务器的ip地址。

**二、Remote**
'Local'用于把服务器上的服务映射到本机的某端口上，'Remote'则相反，它将本地的端口映射到服务器的某一端口上，在服务器上访问该端口，实际是访问本机的服务。与此类似的是：防火墙的端口映射模式，与之不同的是：前者是在公司防火墙上开了一个洞，是合法的操作；后者是凿了一个洞，是非法操作，无须经过网管人员。后者可能为公司企业带来泄密的风险，尤其是做了到ssh端口映射，就可从外部服务器上就可访问公司整个内部网络！

'Source Host'为远程服务器的地址，默认为'localhost'，当然也可以那台主机上的其它ip地址，为了安全起见，ssh仅会侦听回环(127.0.0.1)地址，即使填写的是公网地址也是如此。'Listen Port'为指定在公网服上侦听的端口，注意不要与其它已经在用的端口相冲突。'Destination Host'这个为公司内网地址，这个地址的端口上运行着你想访问的服务，当然也可以只映射到本机上的某一端口。

因此这种方式也叫做"反向代理"。

示例：让公网上的服务器访问局域网里的某台机器的的服务

访问另外一台机器(192.168.18.100)上的web服务

![img](http://www.freeoa.net/images/unixsupt/sysman/2013/remote_port_forward_web.png)

通过ssh登录内部一台机器的ssh，这样远程的机器就能控制内部这台机器了，如果能登录成功的话，还可以从它跳转登录到局域网其它机器。

![img](http://www.freeoa.net/images/unixsupt/sysman/2013/remote_reverse_proxy_ssh.png)

在linux下，可以借助于'[autossh](http://www.freeoa.net/product/apptool/autossh_1884.html)'这款工具来实现。


**三、Dynamic**
即socket代理，用于给本地开启代理端口，只要程序支持Socket连接方式，如浏览器通过本端口代理上网。

在弹出的'Forwarding Rule'，按照如图所示进行配置，Type选择"Dynamic(SOCK54/5"；'Listen Port'默认使用1080，这里也可以按照自己需求进进行端口设置；Descripting根据自己需要进行描述，可以留空，配置后点击OK会弹出一个对话框，点击是的话会对当前会话进行保存，以后每次连接此ssh会话，本地socket代理会自动打开。

![img](http://www.freeoa.net/images/unixsupt/sysman/2013/socket_proxy.png)

添加完成后在'Forwarding Rules'对话框可以看到的一行转发配置，确保Status的状态是"Open"，如果显示的是"Failed"可能是1080这个本地端口已经被占用了，可以尝试修改代理端口为其它端口进行重新设置。

至此，代理服务器设置已经完成了，下面将进行浏览器客户端的配置。

打开Internet选项，点击“连接”选项卡，在这个页面点击“局域网设置”，弹出“局域网(LAN)设置”。

在代理服务器下面勾选“为LAN使用代理服务器”，地址和端口全部留空，点击“高级”，进入“代理服务器设置”端口。在套接字一行，代理服务器地址写"localhost"，端口写"1080"，然后依次点击确定，回到浏览器页面就可以通过代理进行上网了。可以访问 http://www.ip138.com/ 来看一下出来的ip地址是否有变化。

如果想给本地其它电脑做代理，可以给其它电脑做类似设置，但是地址需要写和对方进行通信的内网ip地址而不是socket了。这个方法主要针对那些你不能打开的网页，比如公司在出口路由上对影响工作的网站或应用进行了屏避，或逃过公司做你上网记录的收集(交换机端口镜像)，这个方法就非常好用了，其实我经常用后者来对我的隐私做最大的保护。

除了为本地的机器开启上网浏览服务外，还可以用来解决文章前面所提及的直接登录外部机房里只有私有ip的机器，这样你就不用先登录有公网ip的机器，然后在那台机器里用ssh再登录内网机器了。操作方法如下：
host_a：你在公司的pc，装有xshell
host_b：外网服务器，其上有公网ip和私网ip
host_c：外网服务器，其上仅有私网ip

这里要知道：host_b与host_c它们是位于机房中的局域网内，它们之间的通信只能通过私网进行，数据包不会出公网。且host_a与'host_b，host_c'的私网是完全独立的，没有任何关系。


现在从host_a使用xshell连接host_b，并开启Socket代理，端口为'1080'，建立好连接后，打开'cmd'容器，使用指令'netstat -na|more'看下应该有'1080'端口处于侦听(LISTENING)状态。同是不要断开连接，因为host_a发住host_c的数据信息都要从这个端口到host_b，然后再由host_b转发至host_c。


建立到host_c的ssh连接，写好host_c的私网ip地址(不是host_b的)，用户名及密码，做好后先不要连接(实际也连接不上)，在设置好其代理后才可继续连接。


在'Connection'->'Proxy Server'页中，如果没有添加host_b的代理名称及信息话，点击'Browse...'按纽。
![img](http://www.freeoa.net/images/unixsupt/sysman/2013/socket_proxy_set_list.png)



![img](Untitled.assets/socket_proxy_set_add.png)

添加一个已经建立起连接的名称，这里为'nhk3'，'host'一般为'127.0.0.1'的地址(如果有公司内有专用的代理机的话，则填入那台机器的ip地址)，端口为刚才使用的端口。


![img](http://www.freeoa.net/images/unixsupt/sysman/2013/socket_proxy_set_che.png)

选择适用的'Proxy Server'为'nhk3'，确定后即可开始连接。要终端窗口里会打印出通过'Proxy'连接的信息：
Connecting to proxy server(127.0.0.1:1080)...
Connection established.
To escape to local shell, press 'Ctrl+Alt+]'.

Last login: Fri Apr 19 15:41:06 2013 from 192.168.x.x



这里的'192.168.x.x'即是'host_b'的私网ip。