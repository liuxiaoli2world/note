# centos7 固定ip

```shell
cd /etc/sysconfig/network-scripts
ls
vi ifcfg-ens33
```



修改以下项目：

```text
BOOTPROTO=static        #开机协议，有dhcp及static；
ONBOOT=yes              #设置为开机启动；
DNS1=202.103.24.68 			#这个是国内的DNS地址，是固定的；  
IPADDR=192.168.1.110      #你想要设置的固定IP，理论上192.168.2.2-255之间都可以，请自行验证；
NETMASK=255.255.255.0   #子网掩码，不需要修改；
GATEWAY=192.168.1.1     #网关，这里是你在“2.配置虚拟机的NAT模式具体地址参数”中的（2）选择VMnet8--取消勾选使用本地DHCP--设置子网IP--网关IP设置。
```

