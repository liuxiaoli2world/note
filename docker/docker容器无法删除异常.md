# Docker容器无法删除异常

最近在CentOS 7.3上使用docker时频繁碰到已创建容器无法被删除的异常，异常信息显示容器挂载的卷无法被正常卸载导致容器无法删除。从GitHub上的讨论记录来看，这个异常持续了很久，似乎和`live-restore`参数或者CentOS系统内核有关，目前尚未追查清楚，在讨论中找到了一个解决方案解决了问题，记录备忘。

首先找到未能正常卸载目录进程的 pid：

```bash
# 所有docker挂载
grep docker /proc/*/mountinfo
# 指定目录
grep 2a2dd5 /proc/*/mountinfo
```

然后进入该进程的命名空间，卸载相关目录：

```bash
nsenter -m -t 12321 /bin/bash
# 查看mount信息
mount
# 卸载相关目录
umount /var/lib/docker/overlay/*
umount /var/lib/docker/overlay/2a2dd584da9858fc9e5928d55ee47328712c43e52320b050ef64db87ef4d545a/merged
```

这样就可以正常删除容器了。

以下为GitHub上原始讨论：

```bash
I just experienced this multiple times. I added MountFlags=private to the docker service to prevent further mount leaks, but I was sick of restarting the machine, so I went hunting for a way to get rid of the leaked mounts without restarting.

Looking for these leaked mounts, I noticed here that each pid has its own mountinfo at /proc/[pid]/mountinfo. So, to see where the leaks were I did:

$ grep docker /proc/*/mountinfo
/proc/13731/mountinfo:521 460 8:3 /var/lib/docker/overlay /var/lib/docker/overlay rw,relatime shared:309 - xfs /dev/sda3 rw,seclabel,attr2,inode64,noquota
/proc/13731/mountinfo:522 521 0:46 / /var/lib/docker/overlay/2a2dd584da9858fc9e5928d55ee47328712c43e52320b050ef64db87ef4d545a/merged rw,relatime shared:310 - overlay overlay rw,seclabel,lowerdir=/var/lib/docker/overlay/7cbf3db2f8b860ba964c88539402f35c464c36013efcb845bce2ee307348649f/root,upperdir=/var/lib/docker/overlay/2a2dd584da9858fc9e5928d55ee47328712c43e52320b050ef64db87ef4d545a/upper,workdir=/var/lib/docker/overlay/2a2dd584da9858fc9e5928d55ee47328712c43e52320b050ef64db87ef4d545a/work
/proc/13731/mountinfo:523 521 0:47 / /var/lib/docker/overlay/12f139bad50b1837a6eda1fe6ea5833853746825bd55ab0924d70cfefc057b54/merged rw,relatime shared:311 - overlay overlay rw,seclabel,lowerdir=/var/lib/docker/overlay/d607050a3f9cdf004c6d9dc9739a29a88c78356580db90a83c1d49720baa0e5d/root,upperdir=/var/lib/docker/overlay/12f139bad50b1837a6eda1fe6ea5833853746825bd55ab0924d70cfefc057b54/upper,workdir=/var/lib/docker/overlay/12f139bad50b1837a6eda1fe6ea5833853746825bd55ab0924d70cfefc057b54/work
/proc/13731/mountinfo:524 521 0:48 / /var/lib/docker/overlay/33fb78580b0525c97cde8f23c585b31a004c51becb0ceb191276985d6f2ba69f/merged rw,relatime shared:312 - overlay overlay rw,seclabel,lowerdir=/var/lib/docker/overlay/5e8f5833ef21c482df3d80629dd28fd11de187d1cbbfe8d00c0500470c4f4af2/root,upperdir=/var/lib/docker/overlay/33fb78580b0525c97cde8f23c585b31a004c51becb0ceb191276985d6f2ba69f/upper,workdir=/var/lib/docker/overlay/33fb78580b0525c97cde8f23c585b31a004c51becb0ceb191276985d6f2ba69f/work
/proc/13731/mountinfo:525 521 0:49 / /var/lib/docker/overlay/e6306bbab8a29f715a0d9f89f9105605565d26777fe0072f73d5b1eb0d39df26/merged rw,relatime shared:313 - overlay overlay rw,seclabel,lowerdir=/var/lib/docker/overlay/409a9e5c05600faa82d34e8b8e7b6d71bffe78f3e9eff30846200b7a568ecef0/root,upperdir=/var/lib/docker/overlay/e6306bbab8a29f715a0d9f89f9105605565d26777fe0072f73d5b1eb0d39df26/upper,workdir=/var/lib/docker/overlay/e6306bbab8a29f715a0d9f89f9105605565d26777fe0072f73d5b1eb0d39df26/work
/proc/13731/mountinfo:526 521 0:50 / /var/lib/docker/overlay/7b56a0220212d9785bbb3ca32a933647bac5bc8985520d6437a41bde06959740/merged rw,relatime shared:314 - overlay overlay rw,seclabel,lowerdir=/var/lib/docker/overlay/d601cf06e1682c4c30611d90b67db748472d399aec8c84487c96cfb118c060c5/root,upperdir=/var/lib/docker/overlay/7b56a0220212d9785bbb3ca32a933647bac5bc8985520d6437a41bde06959740/upper,workdir=/var/lib/docker/overlay/7b56a0220212d9785bbb3ca32a933647bac5bc8985520d6437a41bde06959740/work
That told me that process 13731 still had references to /var/lib/docker/overlay, so I (as root) entered the mount namespace of that process and removed the mounts:

$ nsenter -m -t 13731 /bin/bash
$ mount
<snipped mount output that verifies that it does see those mount points>
$ umount /var/lib/docker/overlay/*
$ umount /var/lib/docker/overlay
$ exit
At which point I could finally delete /var/lib/docker, restart the docker service (thus recreating everything in /var/lib/docker), and have no more issues.
```