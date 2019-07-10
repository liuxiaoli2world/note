# RHEL/CentOS
[官网安装说明](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)

Install the prerequisites:

```bash
sudo yum install yum-utils
```

To set up the yum repository, create the file named /etc/yum.repos.d/nginx.repo with the following contents:

```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
```



```
[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
```

By default, the repository for stable nginx packages is used. If you would like to use mainline nginx packages, run the following command:

```bash
sudo yum-config-manager --enable nginx-mainline
```

To install nginx, run the following command:

```bash
sudo yum install nginx
```


When prompted to accept the GPG key, verify that the fingerprint matches 573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62, and if so, accept it.