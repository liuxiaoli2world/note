# register管理nrm

## 功能

npm为用户提供快速管理npm registry，默认支持npm,cnpm,nj,taobao,rednpm之间的切换，可以自己添加额外的registry

## 使用

- 安装

```ruby
$ npm install -g nrm
```

- 查看所有registry

```cpp
$ nrm ls
*npm -----  https://registry.npmjs.org/
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  rednpm -- http://registry.mirror.cqupt.edu.cn
  skimdb -- https://skimdb.npmjs.com/registry
```

- 切换registry

```php
$ nrm use [registry] 
```

- 对比原来config方式

```cpp
npm --registry https://registry.npm.taobao.org install xxx
或者
npm config set registry https://registry.npm.taobao.org
npm install xxx
或者
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install xxx
```

- help

```bash
Usage: nrm [options] [command]

  Commands:

    ls                           List all the registries
    use <registry>               Change registry to registry
    add <registry> <url> [home]  Add one custom registry
    del <registry>               Delete one custom registry
    home <registry> [browser]    Open the homepage of registry with optional browser
    test [registry]              Show the response time for one or all registries
    help                         Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## 附录

[Github](https://link.jianshu.com?t=https://github.com/Pana/nrm)

