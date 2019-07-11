# 设置npm的registry

## 1.原npm地址

```bash
npm config set registry http://registry.npmjs.org 
```



## 2.设置国内镜像

### a.通过config命令

```bash
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```

### b.命令行指定

```bash
npm --registry https://registry.npm.taobao.org info underscore 
```

### c.编辑 ~/.npmrc 加入下面内容

```
registry = https://registry.npm.taobao.org
```



## 3.使用nrm管理registry地址

### a.下载nrm

```bash
npm install -g nrm
```

### b.添加registry地址

```bash
nrm add npm http://registry.npmjs.org
nrm add taobao https://registry.npm.taobao.org
```

### c.切换npm registry地址

```bash
nrm use taobao
nrm use npm
```

