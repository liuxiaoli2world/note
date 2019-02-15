# 创建SSH

> 参考[github创建ssh链接官网](https://help.github.com/articles/connecting-to-github-with-ssh/)

``` shell
lxl_0@L430 MINGW64 /d/git
$ git clone git@github.com:liuxiaoli2world/wx-demo.git
Cloning into 'wx-demo'...
Warning: Permanently added the RSA host key for IP address '13.229.188.59' to the list of known hosts.
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

lxl_0@L430 MINGW64 /d/git
$ cd ~

lxl_0@L430 MINGW64 ~
$ cd .ssh

lxl_0@L430 MINGW64 ~/.ssh
$ ll
total 9
-rw-r--r-- 1 lxl_0 197609 1876 2月  15 12:17 git-ssh
-rw-r--r-- 1 lxl_0 197609  407 2月  15 12:17 git-ssh.pub
-rw-r--r-- 1 lxl_0 197609 1383 2月  15 12:43 known_hosts

lxl_0@L430 MINGW64 ~/.ssh
$ ssh-keygen -t rsa 4096 -C "liuxiaoli2world@gmail.com"
Too many arguments.
usage: ssh-keygen [-q] [-b bits] [-t dsa | ecdsa | ed25519 | rsa]
                  [-N new_passphrase] [-C comment] [-f output_keyfile]
       ssh-keygen -p [-P old_passphrase] [-N new_passphrase] [-f keyfile]
       ssh-keygen -i [-m key_format] [-f input_keyfile]
       ssh-keygen -e [-m key_format] [-f input_keyfile]
       ssh-keygen -y [-f input_keyfile]
       ssh-keygen -c [-P passphrase] [-C comment] [-f keyfile]
       ssh-keygen -l [-v] [-E fingerprint_hash] [-f input_keyfile]
       ssh-keygen -B [-f input_keyfile]
       ssh-keygen -D pkcs11
       ssh-keygen -F hostname [-f known_hosts_file] [-l]
       ssh-keygen -H [-f known_hosts_file]
       ssh-keygen -R hostname [-f known_hosts_file]
       ssh-keygen -r hostname [-f input_keyfile] [-g]
       ssh-keygen -G output_file [-v] [-b bits] [-M memory] [-S start_point]
       ssh-keygen -T output_file -f input_file [-v] [-a rounds] [-J num_lines]
                  [-j start_line] [-K checkpt] [-W generator]
       ssh-keygen -s ca_key -I certificate_identity [-h] [-U]
                  [-D pkcs11_provider] [-n principals] [-O option]
                  [-V validity_interval] [-z serial_number] file ...
       ssh-keygen -L [-f input_keyfile]
       ssh-keygen -A
       ssh-keygen -k -f krl_file [-u] [-s ca_public] [-z version_number]
                  file ...
       ssh-keygen -Q -f krl_file file ...

lxl_0@L430 MINGW64 ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "liuxiaoli2world@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/lxl_0/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/lxl_0/.ssh/id_rsa.
Your public key has been saved in /c/Users/lxl_0/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:AliHjs5nLSEZu+N6Qh8kWi+r9xd2lsamzzKNsnoDWqo liuxiaoli2world@gmail.com
The key's randomart image is:
+---[RSA 4096]----+
|    ...          |
|  .o..           |
|  .*.            |
| .*.o.           |
|.+o+ o..S.       |
|..O.= +.B        |
|.=.B.o X         |
|+ =.+ *..        |
|E*.+o= +o        |
+----[SHA256]-----+

lxl_0@L430 MINGW64 ~/.ssh
$ ssh-keygen -p
Enter file in which the key is (/c/Users/lxl_0/.ssh/id_rsa):
Enter old passphrase:
Key has comment 'liuxiaoli2world@gmail.com'
Enter new passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved with the new passphrase.

lxl_0@L430 MINGW64 ~/.ssh
$ eval $(ssh-agent -s)
Agent pid 9492

lxl_0@L430 MINGW64 ~/.ssh
$ ssh-add ./id_rsa
Enter passphrase for ./id_rsa:
Identity added: ./id_rsa (liuxiaoli2world@gmail.com)

lxl_0@L430 MINGW64 ~/.ssh
$ clip < ./id_rsa.pub

lxl_0@L430 MINGW64 ~/.ssh
$ cd d:/git/

lxl_0@L430 MINGW64 /d/git
$ git clone git@github.com:liuxiaoli2world/wx-demo.git
Cloning into 'wx-demo'...
remote: Enumerating objects: 28, done.
remote: Counting objects: 100% (28/28), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 28 (delta 0), reused 25 (delta 0), pack-reused 0R
Receiving objects: 100% (28/28), 97.26 KiB | 43.00 KiB/s, done.

lxl_0@L430 MINGW64 /d/git
$ rm -rf wx-demo
```

