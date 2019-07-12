# Installing MySQL on Linux Using the MySQL Yum Repository

[参考官网](<https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html>)

The [MySQL Yum repository](https://dev.mysql.com/downloads/repo/yum/) for Oracle Linux, Red Hat Enterprise Linux, CentOS, and Fedora provides RPM packages for installing the MySQL server, client, MySQL Workbench, MySQL Utilities, MySQL Router, MySQL Shell, Connector/ODBC, Connector/Python and so on (not all packages are available for all the distributions; see [Installing Additional MySQL Products and Components with Yum](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html#yum-install-components) for details).

## Before You Start

As a popular, open-source software, MySQL, in its original or re-packaged form, is widely installed on many systems from various sources, including different software download sites, software repositories, and so on. The following instructions assume that MySQL is not already installed on your system using a third-party-distributed RPM package; if that is not the case, follow the instructions given in [Section 2.11.7, “Upgrading MySQL with the MySQL Yum Repository”](https://dev.mysql.com/doc/refman/8.0/en/updating-yum-repo.html) or [Replacing a Third-Party Distribution of MySQL Using the MySQL Yum Repository](https://dev.mysql.com/doc/refman/5.7/en/replace-third-party-yum.html).

## Steps for a Fresh Installation of MySQL

Follow the steps below to install the latest GA version of MySQL with the MySQL Yum repository:

1. ### Adding the MySQL Yum Repository

   First, add the MySQL Yum repository to your system's repository list. This is a one-time operation, which can be performed by installing an RPM provided by MySQL. Follow these steps:

   1. Go to the Download MySQL Yum Repository page (<https://dev.mysql.com/downloads/repo/yum/>) in the MySQL Developer Zone.

   2. Select and download the release package for your platform.

   3. Install the downloaded release package with the following command, replacing *platform-and-version-specific-package-name* with the name of the downloaded RPM package:

      ```bash
      shell> sudo yum localinstall platform-and-version-specific-package-name.rpm
      ```

      The installation command adds the MySQL Yum repository to your system's repository list and downloads the GnuPG key to check the integrity of the software packages. See [Section 2.1.3.2, “Signature Checking Using GnuPG”](https://dev.mysql.com/doc/refman/8.0/en/checking-gpg-signature.html) for details on GnuPG key checking.

      You can check that the MySQL Yum repository has been successfully added by the following command (for dnf-enabled systems, replace **yum** in the command with **dnf**):

      ```bash
      shell> yum repolist enabled | grep "mysql.*-community.*"
      ```

      

   Note

   Once the MySQL Yum repository is enabled on your system, any system-wide update by the **yum update**command (or **dnf upgrade** for dnf-enabled systems) will upgrade MySQL packages on your system and also replace any native third-party packages, if Yum finds replacements for them in the MySQL Yum repository; see [Section 2.11.7, “Upgrading MySQL with the MySQL Yum Repository”](https://dev.mysql.com/doc/refman/8.0/en/updating-yum-repo.html) and, for a discussion on some possible effects of that on your system, see [Upgrading the Shared Client Libraries](https://dev.mysql.com/doc/refman/8.0/en/updating-yum-repo.html#updating-yum-repo-client-lib).
   
2. ### Selecting a Release Series

   When using the MySQL Yum repository, the latest GA series (currently MySQL 8.0) is selected for installation by default. If this is what you want, you can skip to the next step, [Installing MySQL](https://dev.mysql.com/doc/refman/8.0/en/linux-installation-yum-repo.html#yum-repo-installing-mysql).

   Within the MySQL Yum repository, different release series of the MySQL Community Server are hosted in different subrepositories. The subrepository for the latest GA series (currently MySQL 8.0) is enabled by default, and the subrepositories for all other series (for example, the MySQL 8.0 series) are disabled by default. Use this command to see all the subrepositories in the MySQL Yum repository, and see which of them are enabled or disabled (for dnf-enabled systems, replace **yum** in the command with **dnf**):

   ```bash
   shell> yum repolist all | grep mysql
   ```

   

   To install the latest release from the latest GA series, no configuration is needed. To install the latest release from a specific series other than the latest GA series, disable the subrepository for the latest GA series and enable the subrepository for the specific series before running the installation command. If your platform supports **yum-config-manager**, you can do that by issuing these commands, which disable the subrepository for the 5.7 series and enable the one for the 8.0 series:

   ```bash
   shell> sudo yum-config-manager --disable mysql57-community
   shell> sudo yum-config-manager --enable mysql80-community
   ```

   

   Besides using **yum-config-manager** or the **dnf config-manager** command, you can also select a release series by editing manually the `/etc/yum.repos.d/mysql-community.repo` file. This is a typical entry for a release series' subrepository in the file:
   
   ```ini
   [mysql57-community]
name=MySQL 5.7 Community Server
   baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/6/$basearch/
enabled=1
   gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
   ```
   
   Find the entry for the subrepository you want to configure, and edit the `enabled` option. Specify `enabled=0` to disable a subrepository, or `enabled=1` to enable a subrepository. For example, to install MySQL 8.0, make sure you have `enabled=0` for the above subrepository entry for MySQL 5.7, and have `enabled=1` for the entry for the 8.0 series:
   
   ```ini
   # Enable to use MySQL 8.0
   [mysql80-community]
   name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/6/$basearch/
   enabled=1
gpgcheck=1
   gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
   ```
   
   You should only enable subrepository for one release series at any time. When subrepositories for more than one release series are enabled, the latest series will be used by Yum.
   
   Verify that the correct subrepositories have been enabled and disabled by running the following command and checking its output (for dnf-enabled systems, replace **yum** in the command with **dnf**):
   
   ```bash
   shell> yum repolist enabled | grep mysql
   ```
   
3. ### Installing MySQL

   Install MySQL by the following command (for dnf-enabled systems, replace **yum** in the command with **dnf**):

   ```bash
   shell> sudo yum install mysql-community-server
   ```


   This installs the package for MySQL server (`mysql-community-server`) and also packages for the components required to run the server, including packages for the client (`mysql-community-client`), the common error messages and character sets for client and server (`mysql-community-common`), and the shared client libraries (`mysql-community-libs`).

4. ### Starting the MySQL Server

   Start the MySQL server with the following command:

   ```bash
   shell> sudo service mysqld start
   Starting mysqld:[ OK ]
   ```


   You can check the status of the MySQL server with the following command:

  ```bash
  shell> sudo service mysqld status
  mysqld (pid 3066) is running.
  ```

At the initial start up of the server, the following happens, given that the data directory of the server is empty:

- The server is initialized.

- SSL certificate and key files are generated in the data directory.

- [`validate_password`](https://dev.mysql.com/doc/refman/8.0/en/validate-password.html) is installed and enabled.

- A superuser account `'root'@'localhost` is created. A password for the superuser is set and stored in the error log file. To reveal it, use the following command:

  ```bash
  shell> sudo grep 'temporary password' /var/log/mysqld.log
  ```

注意：复制临时密码

  Change the root password as soon as possible by logging in with the generated, temporary password and set a custom password for the superuser account:

粘贴临时密码，成功后进入 `mysql` 命令行，执行下面命令：  

  ```sql
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
  ```

  Note

  [`validate_password`](https://dev.mysql.com/doc/refman/8.0/en/validate-password.html) is installed by default. The default password policy implemented by `validate_password` requires that passwords contain at least one upper case letter, one lower case letter, one digit, and one special character, and that the total password length is at least 8 characters.



## 修改 mysql 8 密码

mysql 8 的密码加密策略不同，跟之前的版本不同。

1．首先确认服务器出于安全的状态，也就是没有人能够任意地连接MySQL数据库。 因为在重新设置MySQL的root密码的期间，MySQL数据库完全出于没有密码保护的状态下，其他的用户也可以任意地登录和修改MySQL的信息。可以采用将MySQL对外的端口封闭，并且停止Apache以及所有的用户进程的方法实现服务器的准安全状态。最安全的状态是到服务器的Console上面操作，并且拔掉网线。

2．修改MySQL的登录设置： 

  ```bash
  vim /etc/my.cnf 
  ```

在[mysqld]的段中加上一句：skip-grant-tables 
例如： 

  ```ini
  [mysqld] 
  datadir=/var/lib/mysql 
  socket=/var/lib/mysql/mysql.sock 
  skip-grant-tables 
  ```

保存并且退出vi。

3．重新启动mysqld 

  ```bash
  service mysqld restart 
  ```

4．登录并修改root用户的密码

  ```bash
  mysql
  ```

a. 首先查看当前root用户相关信息，在mysql数据库的user表中；

  ```mysql
  mysql> use mysql;
  mysql> select host, user, authentication_string, plugin from user;
  ```

host: 允许用户登录的ip‘位置’%表示可以远程；

user:当前数据库的用户名；

authentication_string: 用户密码；在mysql 5.7.9以后废弃了password字段和password()函数；

b. 如果当前root用户authentication_string字段下有内容，先将其设置为空；

  ```mysql
  mysql> update user set authentication_string='' where user='root';
  ```

c. 退出mysql, 删除/etc/my.cnf文件最后的 skip-grant-tables ，重启mysql服务；

d. 使用root用户进行登录，因为上面设置了authentication_string为空，所以可以免密码登录；

  ```bash
  mysql
  ```

e. 使用ALTER修改root用户密码；

  ```mysql
  mysql>  ALTER user 'root'@'localhost' IDENTIFIED BY 'Qian123#';
  ```

至此修改成功； 从新使用用户名密码登录即可；



'root'@'localhost' : Root1234.abcd

'liuxiaoli'@'localhost' : Liuxiaoli1234.abcd