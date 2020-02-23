## 1. 分区

/boot    200M

/swap 1024M

/home 2048M

/   

## 2. 最小服务安装后无法上网



 1 进入目录
`**cd /etc/sysconfig****/network-scripts/**`

```
# 编辑网卡的配置文件# 多网卡会对应多个配置文件，均以ifcfg-enp开头# 新环境配置可任意选择，建议按一定顺序选择
```

![img](D:\learning\note\linux\942035-20181017140252582-783379247-1024x57.png)

 

```
vi ifcfg-enp0s3
```

![img](D:\learning\note\linux\942035-20181017140401510-2101291964.png)

把onboot=no改为yes

保存

:wq

重启网络服务`service network restart #重启网络``ip addr #查看IP地址`

 

**使用ifconfig**

 

安装网络工具即可
yum install net-tools