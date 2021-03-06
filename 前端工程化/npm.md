# 前端工程化（5）：你所需要的npm知识储备都在这了

`npm`在前端开发流程中提供了非常完善的自动化工具链，已成为每个前端开发者必备的工具，但是同样由于其强大性导致很多前端开发者只会简单的使用它。本文将总结在日常开发中所需要的`npm`知识点，以便开发者们更好的利用`npm`来辅助项目开发。

## 1、npm 处理 node_modules 目录结构

`node_modules`是一个项目开发、上线所依赖的插件包集合。由于`node_modules`里面的内容繁多，很多开发者并不会在意这个目录里的文件结构细节，只是在开发中按照需求引入这些依赖包即可，但了解`node_modules`的内容可以帮助我们更好的理解`npm`是如何处理这些文件的。

假设项目`App`中有如下三个依赖：

```json
"dependencies": {
    A: "1.0.0",
    B: "1.0.0",
    C: "1.0.0"
}
```

`A`、`B`、`C`三个模块又有如下依赖：

```json
A@1.0.0 -> D@1.0.0

B@1.0.0 -> D@2.0.0

C@1.0.0 -> D@1.0.0
```

### npm 2.x - 嵌套结构

`npm 2.x`安装依赖方式比较简单直接，以递归的方式按照包依赖的树形结构下载填充本地目录结构，也就是说每个包都会将该包的依赖安装到当前包所在的`node_modules`目录中。

执行`npm install`后，项目`App`的`node_modules`会变成如下目录结构：

```
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
```

很显然这样的依赖组织结构，有如下优点：

- 层级结构明显
- 简单的实现了多版本兼容
- 保证了对依赖包无论是安装还是删除都会有统一的行为和结构

但是缺点也一样很明显：

- 可能造成相同模块的大量冗余问题
- 可能造成目录结构嵌套比较深

### npm 3.x - 扁平结构

`npm 3.x`则采用了扁平化的结构来安装组织`node_modules`。也就是在执行`npm install`的时候，按照`package.json` 里依赖的顺序依次解析，**遇到新的包就把它安装在第一级目录，后续安装如果遇到一级目录已经存在的包，会先按照约定版本判断版本，如果符合版本约定则忽略，否则会按照npm 2.x的方式依次挂在依赖包目录下**。

还以项目`App`为例，在`npm 3.x`环境下，执行`npm install`后，`node_modules`会变成如下目录结构：

```
├── node_modules
│   ├── A@1.0.0
│   ├── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
```

> 模块的安装次序决定了`node_modules`中的目录结构，`npm`会优先将模块安装在根目录下的`node_modules`中。

再在项目中安装模块`E@1.0.0`（依赖于模块`D@2.0.0`），目录结构变为：

```
├── node_modules
│   ├── A@1.0.0
│   ├── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
│   ├── E@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
```

`B`、`E`模块下都包含了依赖的模块`D@2.0.0`，存在代码冗余的情况。

再在项目中安装模块`F@1.0.0`（依赖于模块`D@1.0.0`）。由于`D@1.0.0`已经存在于项目根目录下的`node_modules` 下，所以在安装`F`模块的时候，无需再在其依赖包中安装`D@1.0.0`模块，目录结构变为：

```
├── node_modules
│   ├── A@1.0.0
│   ├── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
│   ├── E@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── F@1.0.0
```

从以上结构可以看出，`npm 3.x`并没有完美的解决`npm 2.x`中的问题，甚至还会退化到`npm 2.x`的行为。

为了解决目录中存在很多副本的情况，（在`A`、`C`模块的依赖模块`D`升级到`2.0.0`前提下）可以通过**`npm dedupe`**指令把所有二级的依赖模块`D@2.0.0`重定向到一级目录下：

```
├── node_modules
│   ├── A@1.0.0
│   ├── D@2.0.0
│   ├── B@1.0.0
│   └── C@1.0.0
│   ├── E@1.0.0
│   └── F@1.0.0
```

> node_modules路径查找机制：模块再找对应的依赖包时，`nodejs`会尝试从当前模块所在目录开始，尝试在它的`node_modules` 文件夹里加载相应模块，如果没有找到，那么就再向上一级目录移动，直到全局安装路径中的`node_modules`为止。

### npm 5.x - package-lock.json

从`npm 5.x`开始，安装组织`node_modules`和`npm 3.x`一样采用了扁平化的方式，最大的变化是增加了 [package-lock.json](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage-lock.json) 文件。

`npm`为了让开发者**在安全的前提下使用最新的依赖包**，在`package.json`中通常做了锁定大版本的操作，这样在每次`npm install`的时候都会拉取依赖包大版本下的最新的版本。这种机制最大的一个缺点就是当有依赖包有小版本更新时，可能会出现协同开发者的依赖包不一致的问题。

`package-lock.json`文件精确描述了`node_modules` 目录下所有的包的树状依赖结构，每个包的版本号都是完全精确的。以`sass-loader`在`package-lock.json`中为例：

```json
"dependencies": {
  "sass-loader": {
    "version": "7.1.0",
    "resolved": "http://registry.npm.taobao.org/sass-loader/download/sass-loader-7.1.0.tgz",
    "integrity": "sha1-Fv1ROMuLQkv4p1lSihly1yqtBp0=",
    "dev": true,
    "requires": {
      "clone-deep": "^2.0.1",
      "loader-utils": "^1.0.1",
      "lodash.tail": "^4.1.1",
      "neo-async": "^2.5.0",
      "pify": "^3.0.0",
      "semver": "^5.5.0"
    },
    "dependencies": {
      "pify": {
        "version": "3.0.0",
        "resolved": "http://registry.npm.taobao.org/pify/download/pify-3.0.0.tgz",
        "integrity": "sha1-5aSs0sEB/fPZpNB/DbxNtJ3SgXY=",
        "dev": true
      }
    }
  }
}
```

`package-lock.json`的详细描述主要由`version`、`resolved`、`integrity`、`dev`、`requires`、`dependencies`这几个字段构成：

- `version`：包唯一的版本号
- `resolved`：安装源
- `integrity`：表明包完整性的hash值（验证包是否已失效）
- `dev`：如果为true，则此依赖关系仅是顶级模块的开发依赖关系或者是一个的传递依赖关系
- `requires`：依赖包所需要的所有依赖项，对应依赖包`package.json`里`dependencies`中的依赖项
- `dependencies`：依赖包`node_modules`中依赖的包，与顶层的`dependencies`一样的结构

在上面的`package-lock.json`文件中可以发现，在`requires`和`dependencies`中都存在`pify`依赖项。那我们顺便去`node_modules`里面探下究竟：

1. 打开根目录的`node_modules`会发现安装了`sass-loader`所需要的所有依赖包，这些依赖包中除了`pify`以外，所有依赖包的大版本号都与`sass-loader`所需要的一致。
2. 到根目录的`node_modules`找到`pify`依赖包，发现版本为`4.0.1`。
3. 找到`sass-loader`项目依赖包，打开其`node_modules`发现其中也存在个`pify`依赖包，但版本为`3.0.0`。这个版本的`sass-loader`真正依赖的是这个版本的`pify`。

通过以上几个步骤，也验证了之前阐述过的`npm 5.x`是扁平化处理依赖的方式。

在开发一个应用时，建议把`package-lock.json`文件提交到代码版本仓库，从而让你的团队成员、运维部署人员或`CI`系统可以在执行`npm install`时安装的依赖版本都是一致的。

但是在开发一个库时，则不应把`package-lock.json`文件发布到仓库中。实际上，`npm`也默认不会把`package-lock.json`文件发布出去。之所以这么做，是因为库项目一般是被其他项目依赖的，在不写死的情况下，就可以复用主项目已经加载过的包，而一旦库依赖的是精确的版本号那么可能会造成包的冗余。

## 2、npm中的依赖包

### 依赖包分类

在 `node` 中其实总共有5种依赖：

- **dependencies - 业务依赖**
- **devDependencies - 开发依赖**
- **peerDependencies - 同伴依赖**
- **bundledDependencies / bundleDependencies - 打包依赖**
- **optionalDependencies - 可选依赖**

作为`npm`的使用者，我们常用的依赖是`dependencies`和`devDependencies`，剩下三种依赖则是作为包的发布者才会使用到的字段。

#### **dependencies**

这种依赖在项目最终上线或者发布`npm`包时所需要，即其中的依赖项应该属于线上代码的一部分。比如框架`vue`，第三方的组件库`element-ui`等，这些依赖包都是必须装在这个选项里供生产环境使用。

通过命令`npm install/i packageName -S/--save`把包装在此依赖项里。如果没有指定版本，直接写一个包的名字，则安装当前npm仓库中这个包的最新版本。如果要指定版本的，可以把版本号写在包名后面，比如`npm i vue@3.0.1 -S`。

> 从`npm 5.x`开始，可以不用手动添加`-S/--save`指令，直接执行`npm i packageName`把依赖包添加到`dependencies`中去。

#### **devDependencies**

这种依赖只在项目开发时所需要，即其中的依赖项不应该属于线上代码的一部分。比如构建工具`webpack`、`gulp`，预处理器`babel-loader`、`scss-loader`，测试工具`e2e`、`chai`等，这些都是辅助开发的工具包，无须在生产环境使用。

通过命令`npm install/i -D/--save-dev`把包安装成开发依赖。如果想缩减安装包，可以使用命令`npm i --production`忽略开发依赖，只安装基本依赖，这通常在线上机器（或者`QA`环境）上使用。

> **千万别以为只有在dependencies中的模块才会被一起打包，而在devDependencies中的不会！模块能否被打包，取决于项目里是否被引入了该模块！** 在业务项目中`dependencies`和`devDependencies`没有什么本质区别，只是单纯的一个规范作用，在执行`npm i`时两个依赖下的模块都会被下载；而在发布`npm`包的时候，包中的`dependencies`依赖项在安装该包的时候会被一起下载，`devDependencies`依赖项则不会。

#### **peerDependencies**

这种依赖的作用是提示宿主环境去安装插件在`peerDependencies`中所指定依赖的包，然后插件所依赖的包永远都是宿主环境统一安装的`npm`包，最终解决插件与所依赖包不一致的问题。

这句话听起来可能有点拗口，举个例子来给大家说明下。`element-ui@2.6.3`只是提供一套基于`vue`的`ui`组件库，但它要求宿主环境需要安装指定的`vue`版本，所以你可以看到`element`项目中的`package.json`中具有一项配置：

```json
"peerDependencies": {
    "vue": "^2.5.16"
}
```

它要求宿主环境安装`3.0.0 > vue@ >= 2.5.16`的版本，也就是`element-ui`的运行依赖宿主环境提供的该版本范围的`vue`依赖包。

在安装插件的时候，`peerDependencies`在`npm 2.x`和`npm 3.x`中表现不一样：

在`npm 2.x`中，安装包中`peerDependencies`所指定的依赖会随着`npm install packageName`一起被强制安装，并且`peerDependencies`中指定的依赖会安装在宿主环境中，所以不需要在宿主环境的`package.json`文件中指定对所安装包中`peerDependencies`内容的依赖。

在`npm 3.x`中，不会再要求`peerDependencies`所指定的依赖包被强制安装，`npm 3.x`只会在安装结束后检查本次安装是否正确，如果不正确会给用户打印警告提示，比如提示用户有的包必须安装或者有的包版本不对等。

> 大白话：如果你安装我，那么你最好也要按照我的要求安装A、B和C。

#### **bundledDependencies / bundleDependencies**

这种依赖跟`npm pack`打包命令有关。假设`package.json`中有如下配置：

```json
{
  "name": "font-end",
  "version": "1.0.0",
  "dependencies": {
    "fe1": "^0.3.2",
    ...
  },
  "devDependencies": {
    ...
    "fe2": "^1.0.0"
  },
  "bundledDependencies": [
    "fe1",
    "fe2"
  ]
}
```

执行打包命令`npm pack`，会生成`front-end-1.0.0.tgz`压缩包，并且该压缩包中包含`fe1`和`fe2`两个安装包，这样使用者执行`npm install front-end-1.0.0.tgz`也会安装这两个依赖。

> 在`bundledDependencies`中指定的依赖包，必须先在`dependencies`和`devDependencies`声明过，否则打包会报错。

#### **optionalDependencies**

这种依赖中的依赖项即使安装失败了，也不影响整个安装的过程。需要注意的是，如果一个依赖同时出现在`dependencies`和`optionalDependencies`中，那么`optionalDependencies`会获得更高的优先级，可能造成一些预期之外的效果，所以尽量要避免这种情况发生。

> 在实际项目中，如果某个包已经失效，我们通常会寻找它的替代者，或者换一个实现方案。不确定的依赖会增加代码判断和测试难度，所以这个依赖项还是尽量不要使用。

### 依赖包版本号

`npm`采用了`semver`规范作为依赖版本管理方案。

按照`semver`的约定，一个`npm`依赖包的版本格式一般为：**主版本号.次版本号.修订号**（`x.y.z`），每个号的含义是：

- **主版本号**（也叫大版本，`major version`）

  大版本的改动很可能是一次颠覆性的改动，也就意味着可能存在与低版本不兼容的`API`或者用法，（比如 `vue 2 -> 3`)。

- **次版本号**（也叫小版本，`minor version`）

  小版本的改动应当兼容同一个大版本内的`API`和用法，因此应该让开发者无感。所以我们通常只说大版本号，很少会精确到小版本号。

  > 如果大版本号是 0 的话，表示软件处于开发初始阶段，一切都可能随时被改变，可能每个小版本之间也会存在不兼容性。所以在选择依赖时，尽量避开大版本号是 0 的包。

- **修订号**（也叫补丁，`patch`）

  一般用于修复`bug`或者很细微的变更，也需要保持向前兼容。

常见的几个版本格式如下：

- **"1.2.3"**

  表示精确版本号。任何其他版本号都不匹配。在一些比较重要的线上项目中，建议使用这种方式锁定版本。

- **"^1.2.3"**

  表示兼容补丁和小版本更新的版本号。官方的定义是“能够兼容除了最左侧的非 0 版本号之外的其他变化”(Allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple)。这句话很拗口，举几个例子大家就明白了：

  ```
  "^1.2.3" 等价于 ">= 1.2.3 < 2.0.0"。即只要最左侧的 "1" 不变，其他都可以改变。所以 "1.2.4", "1.3.0" 都可以兼容。
  
  "^0.2.3" 等价于 ">= 0.2.3 < 0.3.0"。因为最左侧的是 "0"，那么只要第二位 "2" 不变，其他的都兼容，比如 "0.2.4" 和 "0.2.99"。
  
  "^0.0.3" 等价于 ">= 0.0.3 < 0.0.4"。大版本号和小版本号都为 "0" ，所以也就等价于精确的 "0.0.3"。
  
  ```

  从这几个例子可以看出，`^` 是一个兼具更新和安全的写法，但是对于大版本号为 1 和 0 的版本还是会有不同的处理机制的。

- **"~1.2.3"**

  表示只兼容补丁更新的版本号。关于 `~` 的定义分为两部分：如果列出了小版本号（第二位），则只兼容补丁（第三位）的修改；如果没有列出小版本号，则兼容第二和第三位的修改。我们分两种情况理解一下这个定义：

  ```
  "~1.2.3" 列出了小版本号 "2"，因此只兼容第三位的修改，等价于 ">= 1.2.3 < 1.3.0"。
  
  "~1.2" 也列出了小版本号 "2"，因此和上面一样兼容第三位的修改，等价于 ">= 1.2.0 < 1.3.0"。
  
  "~1" 没有列出小版本号，可以兼容第二第三位的修改，因此等价于 ">= 1.0.0 < 2.0.0"
  
  ```

  从这几个例子可以看出，`~` 是一个比`^`更加谨慎安全的写法，而且`~`并不对大版本号 0 或者 1 区别对待，所以 "~0.2.3" 与 "~1.2.3" 是相同的算法。当首位是 0 并且列出了第二位的时候，两者是等价的，例如 "~0.2.3" 和 "^0.2.3"。

- **"1.x" 、"1.X"、1.\*"、"1"、"\*"**

  表示使用通配符的版本号。x、X、* 和 （空） 的含义相同，都表示可以匹配任何内容。具体来说：

  ```
  "*" 、"x" 或者 （空） 表示可以匹配任何版本。
  
  "1.x", "1.*" 和 "1" 表示匹配主版本号为 "1" 的所有版本，因此等价于 ">= 1.0.0 < 2.0.0"。
  
  "1.2.x", "1.2.*" 和 "1.2" 表示匹配版本号以 "1.2" 开头的所有版本，因此等价于 ">= 1.2.0 < 1.3.0"。
  ```

- **"1.2.3-beta.1"**

  带预发布关键词的版本号。先说说几个预发布关键词的定义：

  ```
  alpha(α)：预览版，或者叫内部测试版；一般不向外部发布，会有很多bug；一般只有测试人员使用。
  
  beta(β)：测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在alpha版之后推出。
  
  rc(release candidate)：最终测试版本；可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本。
  ```

  以包开发者的角度来考虑这个问题：假设当前线上版本是 "1.2.3"，如果我作了一些改动需要发布版本 "1.2.4"，但我不想直接上线（因为使用 "~1.2.3" 或者 "^1.2.3" 的用户都会直接静默更新），这就需要使用预发布功能。因此我可能会发布 "1.2.4-alpha.1" 或者 "1.2.4-beta.1" 等等。

  ```
  ">1.2.4-alpha.1"表示接受 "1.2.4-alpha" 版本下所有大于 1 的预发布版本。因此 "1.2.4-alpha.7" 是符合要求的，但 "1.2.4-beta.1" 和 "1.2.5-alpha.2" 都不符合。此外如果是正式版本（不带预发布关键词），只要版本号符合要求即可，不检查预发布版本号，例如 "1.2.5", "1.3.0" 都是认可的。
  
  "~1.2.4-alpha.1" 表示 ">=1.2.4-alpha.1 < 1.3.0"。这样 "1.2.5", "1.2.4-alpha.2" 都符合条件，而 "1.2.5-alpha.1", "1.3.0" 不符合。
  
  "^1.2.4-alpha.1" 表示 ">=1.2.4-alpha.1 < 2.0.0"。这样 "1.2.5", "1.2.4-alpha.2", "1.3.0" 都符合条件，而 "1.2.5-alpha.1", "2.0.0" 不符合。
  ```

版本号还有更多的写法，例如范围（`a - b`），大于等于号（`>=`），小于等于号（`<=`），或（`||`）等等，因为用的不多，这里不再展开。详细的文档可以参见[语义化版本(semver)](https://link.juejin.im/?target=https%3A%2F%2Fsemver.org%2Flang%2Fzh-CN%2F)。它同时也是一个 `npm` 包，可以用来比较两个版本号的大小，以及是否符合要求等。

### 依赖包版本管理

`npm 2.x/3.x`已成为过去式，在`npm 5.x`以上环境下（版本最好在`5.6`以上，因为在`5.0 ~ 5.6`中间对`package-lock.json`的处理逻辑更新过几个版本，`5.6`以上才开始稳定），管理依赖包版本你应该知道（以`^`版本为例，其他类型版本参照即可）：

1. 在大版本相同的前提下，如果一个模块在`package.json`中的小版本要**大于**`package-lock.json`中的小版本，则在执行`npm install`时，会将该模块更新到大版本下的最新的版本，并将版本号更新至`package-lock.json`。如果**小于**，则被`package-lock.json`中的版本锁定。

```json
// package-lock.json 中原版本
"clipboard": {
  "version": "1.5.10", 
},
"vue": {
  "version": "2.6.10",
}
// package.json 中修改版本
"dependencies": {
  "clipboard": "^1.5.12",
  "vue": "^2.5.6"
  ...
}

// 执行完 npm install 后，package-lock.json 中
"clipboard": {
  "version": "1.7.1", // 更新到大版本下的最新版本
},
"vue": {
  "version": "2.6.10", // 版本没发生改变
}
```

1. 如果一个模块在`package.json`和`package-lock.json`中的大版本不相同，则在执行`npm install`时，都将根据`package.json`中大版本下的最新版本进行更新，并将版本号更新至`package-lock.json`。

```json
// package-lock.json 中原版
"clipboard": {
  "version": "2.0.4",
}
// package.json 中修改版本
"dependencies": {
  "clipboard": "^1.6.1",
}

// 执行完npm install后，package-lock.json 中
// 
"clipboard": {
  "version": "1.7.1", // 更新到大版本下的最新版本
}
```

1. 如果一个模块在`package.json`中有记录，而在`package-lock.json`中无记录，执行`npm install`后，则会在`package-lock.json`生成该模块的详细记录。同理，一个模块在`package.json`中无记录，而在`package-lock.json`中有记录，执行`npm install`后，则会在`package-lock.json`删除该模块的详细记录。
2. 如果要更新某个模块大版本下的最新版本（升级小版本号），可以执行以下命令：

```shell
npm install packageName
// 或者
npm update packageName
```

1. 如果要更新到指定版本号（升级大版本号），可以执行如下命令：

```shell
npm install packageName@x.x.x
```

1. 卸载某个模块，可以执行如下命令：

```shell
npm uninstall packageName
```

通过上述的命令来管理依赖包，`package.json`和`package-lock.json`中的版本号都将会随之更新。

> 我们在升级/卸载依赖包的时候，尽量通过命令来实现，避免手动修改`package.json`中的版本号，尤其是不要手动修改`package-lock.json`。

## 3、npm scripts 脚本

`package.json`中的 [scripts](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fscripts) 字段可以用来自定义脚本命令，它的每一个属性，对应一段脚本。以`vue-cli3`为例：

```json
"scripts": {
  "serve": "vue-cli-service serve",
  ...
}
```

这样就可以通过`npm run serve`脚本代替`vue-cli-service serve`脚本来启动项目，而无需每次敲一遍这么冗长的脚本。

### 工作原理

#### package.json 中的 bin 字段

`package.json`中的字段 [bin](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage.json.html%23bin) 表示的是一个**可执行文件到指定文件源的映射**。例如在`@vue/cli-service`的`package.json`中：

```json
"bin": {
  "vue-cli-service": "bin/vue-cli-service.js"
}
```

如果全局安装`@vue/cli-service`的话，**@vue/cli-service源文件会被安装在全局源文件安装目录（/user/local/lib/node_modules）下，而npm会在全局可执行bin文件安装目录（/usr/local/bin）下创建一个指向../lib/node_modules/@vue/cli-service/bin/vue-cli-service.js文件的名为vue-cli-service的软链接**，这样就可以直接在终端输入`vue-cli-service`来执行。

如果局部安装`@vue/cli-service`的话，`npm`则会在本地项目`node_modules/.bin`目录下创建一个指向`../@vue/cli-service/bin/vue-cli-service.js`名为`vue-cli-service`的软链接，这个时候需要在终端中输入`./node_modules/.bin/vue-cli-service`来执行（也可以使用`npx vue-cli-service`命令来执行，[npx](https://link.juejin.im/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F02%2Fnpx.html) 的作用就是为了方便调用项目内部安装的模块）。

> 软链接（符号链接）是一类特殊的可执行文件， 其包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的引用。在`bin`目录下执行`ll`指令可以查看具体的软链接指向。

#### PATH 环境变量

在`terminal`中执行命令时，**命令会在PATH环境变量里包含的路径中去寻找相同名字的可执行文件**。局部安装的包只在`./node_modules/.bin`中注册了它们的可执行文件，不会被包含在`PATH`环境变量中，这个时候在`terminal`中输入命令将会报无法找到的错误。

那为什么通过`npm run`可以执行局部安装的命令行包呢？

是因为**每当执行npm run时，会自动新建一个Shell，这个 Shell会将当前项目的node_modules/.bin的绝对路径加入到环境变量PATH中，执行结束后，再将环境变量PATH恢复原样**。

我们来验证下这个说法。首先执行 [env](https://link.juejin.im/?target=https%3A%2F%2Fblog.csdn.net%2Felikang%2Farticle%2Fdetails%2F88661467) 查看当前所有的环境变量，可以看到`PATH`环境变量为：

```shell
PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

再在当前项目下执行`npm run env`查看脚本运行时的环境变量，可以看到`PATH`环境变量为：

```shell
PATH=/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/mac/Vue-projects/hao-cli/node_modules/.bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

可以看到运行时的`PATH`环境变量多了两个路径：`npm`指令路径和项目中`node_modules/.bin`的绝对路径。

所以，通过`npm run`可以在不添加路径前缀的情况下直接访问当前项目`node_modules/.bin`目录里面的可执行文件。

> `PATH`环境变量，是告诉系统，当要求系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应到哪些目录下去寻找。

### 用法指南

#### 传入参数

关于`scripts`中的参数，这里要多说几句。网上有很多不是很准确的说法，经过本人的反复试验，`node`处理`scripts`参数其实很简单，比如：

```json
"scripts": {
  "serve": "vue-cli-service serve",
  "serve1": "vue-cli-service --serve1",
  "serve2": "vue-cli-service -serve2",
  "serve3": "vue-cli-service serve --mode=dev --mobile -config build/example.js"
}
```

**除了第一个可执行的命令，以空格分割的任何字符串（除了一些shell的语法）都是参数，并且都能通过process.argv属性访问**。

> `process.argv`属性返回一个数组，这个数组包含了启动`node`进程时的命令行参数。第一个元素为启动`node` 进程的可执行文件的绝对路径名[process.execPath](https://link.juejin.im/?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fprocess.html%23process_process_execpath)，第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他命令行参数。

比如执行`npm run serve3`命令，`process.argv`的具体内容为：

```json
[ '/usr/local/Cellar/node/7.7.1_1/bin/node',
  '/Users/mac/Vue-projects/hao-cli/node_modules/.bin/vue-cli-service',
  'serve',
  '--mode=dev',
  '--mobile',
  '-config',
  'build/example.js']

```

很多命令行包之所以这么写，都是依赖了 [minimist](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsubstack%2Fminimist) 或者 [yargs](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fyargs%2Fyargs) 等参数解析工具来对命令行参数进行解析。

以`minimist`对`vue-cli-service serve --mode=dev --mobile -config build/example.js`解析为例，解析后的结果为：

```json
{ _: [ 'serve' ],
  mode: 'dev',
  mobile: true,
  config: 'build/example.js',
  '$0': '/Users/mac/Vue-projects/hao-cli/node_modules/.bin/vue-cli-service'}

```

在`./node_modules/.bin/vue-cli-service`文件中可以看到`minimist`对命令行参数的处理：

```javascript
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})

```

我们还可以通过命令行传参的形式来进行参数传递：

```shell
npm run serve --params  // 参数params将转化成process.env.npm_config_params = true
npm run serve --params=123 // 参数params将转化成process.env.npm_config_params = 123
npm run serve -params  // 等同于--params参数

npm run serve -- --params  // 将--params参数添加到process.env.argv数组中
npm run serve params  // 将params参数添加到process.env.argv数组中
npm run serve -- params  // 将params参数添加到process.env.argv数组中

```

#### 多命令运行

有的项目在启动时可能需要同时执行多个任务，多个任务的执行顺序决定了项目的表现。

##### 串行执行

串行执行，要求前一个任务执行成功以后才能执行下一个任务，使用`&&`符号来连接。

```shell
npm run script1 && npm run script2

```

> 串行命令执行过程中，只要一个命令执行失败，则整个脚本终止。

##### 并行执行

并行执行，就是多个命令可以同时的平行执行，使用`&`符号来连接。

```shell
npm run script1 & npm run script2

```

这两个符号是`Bash`的内置功能。此外，还可以使用第三方的任务管理器模块：[script-runner](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fpaulpflug%2Fscript-runner)、[npm-run-all](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fmysticatea%2Fnpm-run-all)、[redrun](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fmysticatea%2Fnpm-run-all)。

#### env 环境变量

在执行`npm run`脚本时，`npm`会设置一些特殊的`env`环境变量。其中`package.json`中的所有字段，都会被设置为以`npm_package_` 开头的环境变量。比如`package.json`中有如下字段内容：

```shell
{
  "name": "sh",
  "version": "1.1.1",
  "description": "shenhao",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@gitlab.com/xxxx/sh.git"
  }
}

```

可以通过`process.env.npm_package_name` 可以获取到`package.json`中`name`字段的值`sh`，也可以通过`process.env.npm_package_repository_type`获取到嵌套属性`type`的值`git`。

同时，`npm`相关的所有配置也会被设置为以`npm_config_`开头的环境变量。

此外，还会设置一个比较特殊的环境变量`npm_lifecycle_event`，表示正在运行的脚本名称。比如执行`npm run serve` 的时候，`process.env.npm_lifecycle_event`值为`serve`，通过判断这个变量，可以将一个脚本使用在不同的`npm scripts`中。

> 这些环境变量只能在`npm run`的脚本执行环境内拿到，正常执行的`node`脚本是获取不到的。所以，不能直接通过`env $NODE_ENV`的形式访问，但可以在`scripts`中定义脚本`"scripts": "echo $NODE_ENV"`来访问。

#### 指令钩子

在执行`npm scripts`命令（无论是自定义还是内置）时，都经历了`pre`和`post`两个钩子，在这两个钩子中可以定义某个命令执行前后的命令。

比如在执行`npm run serve`命令时，会依次执行`npm run preserve`、`npm run serve`、`npm run postserve`，所以可以在这两个钩子中自定义一些动作：

```json
"scripts": {
  "preserve": "xxxxx",
  "serve": "vue-cli-service serve",
  "postserve": "xxxxxx"
}

```

当然，如果没有指定`preserve`、`postserve`，会默默的跳过。如果想要指定钩子，必须严格按照`pre`和`post`前缀来添加。

上面提到过一个环境变量`process.env.npm_lifecycle_event`可以配合钩子来一起使用：

```javascript
const event = process.env.npm_lifecycle_event

if (event === 'preserve') {
    console.log('Running the preserve task!')
} else if (_event === 'serve') {
    console.log('Running the serve task!')
}

```

## 4、npm 配置

`npm`的配置操作可以帮助我们预先设定好`npm`对项目的行为动作，也可以让我们预先定义好一些配置项以供项目中使用。所以了解`npm`的配置机制也是很有必要。

### 优先级

`npm`可以从不同的来源获取其配置值，按优先级从高到低的顺序排序：

#### 命令行

```shell
npm run serve --params=123

```

执行上述命令时，会将配置项`params`的值设为`123`，通过`process.env.npm_config_params`可以访问其配置值。这个时候的`params`配置值将覆盖所有其他来源存在的`params`配置值。

#### env 环境变量

如果`env`环境变量中存在以`npm_config_`为前缀的环境变量，则会被识别为`npm`的配置属性。比如在`env`环境变量中设置`npm_config_package_lock`变量：

```javascript
export npm_config_package_lock=false // 修改的是内存中的变量，只对当前终端有效

```

这时候执行`npm install`，`npm`会从环境变量中读取到这个配置项，从而不会生成`package-lock.json`文件。

> 查看某个环境变量：`echo $NODE_ENV`
> 删除某个环境变量：`unset NODE_ENV`

#### npmrc 文件

通过修改 [npmrc](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fnpmrc) 文件可以直接修改配置。系统中存在多个`npmrc`文件，这些`npmrc`文件被访问的优先级从高到低的顺序为：

- 项目级的`.npmrc`文件

  只作用在本项目下。在其他项目中，这些配置不生效。通过创建这个`.npmrc`文件可以统一团队的`npm`配置规范。

- 用户级的`.npmrc`文件

  `mac`下的地址为`~/.npmrc`。（`npm config get userconfig`可以看到存放的路径）

- 全局级的`npmrc`文件

  `mac`下的地址为`$PREFIX/etc/npmrc`。（`npm config get globalconfig`可以看到存放的路径）

- `npm`内置的`npmrc`文件

  这是一个不可更改的内置配置文件，为了维护者以标准和一致的方式覆盖默认配置。`mac`下的地址为`/path/to/npm/npmrc`。

> .npmrc参照 [npm/ini](https://link.juejin.im/?target=https%3A%2F%2Fnote.youdao.com%2F) 格式编写。

#### 默认配置

通过`npm config ls -l`查看`npm`内部的默认配置参数。如果命令行、环境变量、所有配置文件都没有配置参数，则使用默认参数值。

### npm config 指令

`npm`提供了几个 [npm config](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Fconfig) 指令来进行用户级和全局级配置：

#### set

```shell
npm config set <key> <value> [-g|--global]
npm config set registry <url> // 指定下载 npm 包的来源，默认为 https://registry.npmjs.org/ ，可以指定私有源

```

使用`-g|--global`标志修改或新增全局级配置，不使用的话修改或者新增用户级配置（相应级别的`.npmrc`文件会更新）。

如果`key`不存在，则会新增到配置中。如果省略`value`，则`key`会被设置成`true`。

还可以覆盖`package.json`中`config`字段的值：

```javascript
// package.json
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}

// server.js
console.log(process.env.npm_package_config_port)

npm config set foo:port 8000 // 打印8000

```

#### get

```shell
npm config get <key>
npm config get prefix // 获取npm的安装路径

```

按照配置优先级，获取指定配置项的值。

#### delete

```shell
npm config delete <key>

```

`npm`官网上说可以删除所有配置文件中指定的配置项，但经实验无法删除项目级的`.npmrc`文件里指定的配置项。

#### list

```shell
npm config list [-l] [--json]

```

加上`-l`或者`--json`查看所有的配置项，包括默认的配置项。不加的话，不能查看默认的配置项。

#### edit

```shell
npm config edit [-g|--global]

```

在编辑器中打开配置文件。使用`-g|--global`标志编辑全局级配置和默认配置，不使用的话编辑用户级配置和默认配置。

> 参考 [npm config](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fconfig) 来获取`npm`提供的默认配置。

## 5、npm 的几个实用技巧

### 自定义默认的 npm init

使用`npm init`初始化一个新的项目时会提示你去填写一些项目描述信息。如果觉得填写这些信息比较麻烦的话，可以使用`-y`标记表示接受`package.json`中的一些默认值：

```shell
npm init -y

```

也可以设置初始化的默认值：

```shell
npm config set init-author-name <name> // 为 npm init 设置了默认的作者名

```

### 查看 npm 脚本命令

查看当前项目的所有`npm`脚本命令最直接的办法就是打开项目中的`package.json`文件并检查`scripts`字段。我们还可以使用不带任何参数的`npm run`命令查看：

```shell
npm run

```

### 查看环境变量

通过`env`查看当前的所有环境变量，而查看运行时的所有环境变量可以执行：

```shell
npm run env

```

### 模块管理

查看当前项目依赖的所有模块，包括子模块以及子模块的子模块：

```shell
npm list/ls

```

如果还想查看模块的一些描述信息（`package.json`中的`description`中的内容）：

```shell
npm la/ll // 相当于npm ls --long

```

一个项目依赖的模块往往很多，可以限制输出模块的层级来查看：

```shell
npm list/ls --depth=0 // 只列出父包依赖的模块

```

查看一个模块到底是因为谁被安装进来的，如果显示为空则表明该模块为内置模块或者不存在：

```shell
npm ll <packageName>

```

查看当前项目中可升级的模块的信息来更新模块：

```shell
npm outdated
```

整理项目中无关的模块：

```shell
npm prune
```

查看项目中某个模块的当前版本信息：

```shell
npm list/ls <packageName>
```

查看某个模块最新的和历史的版本信息：

```shell
npm view/info <packageName> version // 模块最新的版本信息（不包括预发布版本）
npm view/info <packageName> versions // 模块所有的历史版本信息（包括预发布版本）
```

查看独立模块的所有信息，包括它的依赖、关键字、更新日期、贡献者、仓库地址和许可证等：

```shell
npm view/info <packageName>
```

### 查看模块文档

打开模块的 github 主页：

```shell
npm repo <packageName> 
```

打开模块的文档地址：

```shell
npm docs <packageName>
```

打开模块的 issues 地址：

```shell
npm bugs <packageName>
```

### 版本管理

在`package.json`中有个`version`字段代表的是该模块的版本信息。当发布新版本时，`version`字段也要进行相应的改变。虽然可以手动的修改`vsersion`字段，但是为了整个发布的过程的自动化，最好还是使用指令的形式来进行修改：

```shell
npm version major // 大版本号加1
npm version minor // 小版本号字加1
npm version patch // 补丁号加1
```

### 模块全局化

假设你在开发一个模块`A`，同时需要在另外一个项目`B`中测试它，当然你可以将该模块的代码拷贝到需要使用它的项目中，但这也不是理想的方法，可以在模块`A`的目录下执行：

```shell
npm link
```

`npm link`命令通过链接目录和可执行文件，实现任意位置的`npm`包命令的全局可执行。

`npm link`主要做了两件事：

1. 为目标`npm`模块创建软链接，将其链接到全局`node`模块安装路径`/usr/local/lib/node_modules/`
2. 为目标`npm`模块的可执行`bin`文件创建软链接，将其链接到全局`node`命令安装路径`/usr/local/bin/`

### 依赖锁定

`npm`默认安装模块时，会通过脱字符`^`来限定所安装模块的主版本号。可以配置`npm`通过波浪符`~`来限定安装模块版本号：

```shell
npm config set save-prefix="~"
```

当然还可以配置`npm`仅安装精确版本号的模块：

```shell
npm config set save-exact true
```