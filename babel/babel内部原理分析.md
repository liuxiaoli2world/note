# [Babel 内部原理分析](<https://octman.com/blog/2016-08-27-babel-notes/>)

[JavaScript](https://octman.com/tags/JavaScript/)

[React](https://octman.com/tags/React/)

[Babel](https://octman.com/tags/Babel/)

几乎所有的前端都听说过 Babel。因为它，即便我们的 JavaScript 引擎还没有支持到最新的标准，我们也可以提前使用最新的 JavaScript 标准特性。它是一个转码器，是现代前端开发中必备的一个工具，但对于其内部原理我们知之甚少，本文尝试去深入 babel 的内部进行探索。

Babel 会将按最新标准编写的代码编译到现在可用的 JavaScript 代码，比如 ES2015 标准提出了剪头函数，但很可惜 IE 浏览器并不支持，使用 Babel，它可以将我们的源代码进行转换：

```javascript
// 源代码 main.js
const noop = () => {}
// 转码之后
const noop = function noop() {
}
```

但 Babel 的用途并非仅仅如此，从 Babel 6 开始，其功能已经被插件化。我们可以基于 Babel 内核做很多自定义的事情，如 JSX 语法扩展、静态代码检查等。事实上，围绕着 Babel 已经出现了一个很繁荣的生态圈。

需要说明的是，Github 上的 [babel 源码](https://github.com/babel/babel)实质上对应于 NPM 上的多个包，具体可以参考对应的说明文件，主要包括核心代码（babel-core）、工具包（babel-cli 等）、Preset（babel-preset-es2015 等）和其官方的插件，另外还有一系列 helper 包。这里会将重点放在其核心代码上，即 babel-core。后面会对其插件化和如何编写相应插件进行分析。

## 核心

babel 中最核心的是 babel-core 这个包，它向外暴露出 `babel.transform` 接口，而真正的核心代码则位于 `transformation/pipeline.js` 文件中，所有信息都会挂在到 `transformation/file` 所暴露出来的数据结构 File 上。

在分析其内部流程之前，我们先看一下 File 这个数据结构。

File 维护的是一个文件的所有信息，包括 babel 处理所用的插件等信息。可以说，babel 的繁荣源于其强大的插件管理机制，而其插件，主要由pluginPasses 和 pluginVisitors 来维护。

为了保证在遍历路径的时候能够快速访问对应的插件处理方法，babel 对 pluginVisitors 做了一定的预处理，将所有同类型 Identifier 的处理流程合并到了一起。具体用代码的角度来看，可以简化成这样：

```javascript
const PluginA = {
  Identifier() {},
  FunctionDeclaration() {}
}
const PluginB = {
  BinaryExpression() {},
  FunctionDeclaration() {}
}
// 进行处理后得到
let rootVisitor = {
  Identifier: [PluginA.Identifier],
  BinaryExpression: [PluginB.Identifier],
  FunctionDeclaration: [PluginA.FunctionDeclaration, PluginB.FunctionDeclaration]
}
```

再看一下后续的内部转码流程，其最外层 pipeline 中的代码很简短：

```javascript
file.wrap(code, function () {
  file.addCode(code);
  file.parseCode(code); // 去除 shibang（即顶部的 #!/usr/bin/env node 信息） 之后使用 babylon 解析出 ast，使用 babel-traverse 进行遍历
  return file.transform();
});
```

其过程分解用语言描述的话，就是下面这样：

1. 使用 babylon 解析器对输入的源代码字符串进行解析并生成初始 AST（`File.prototype.parse`）
2. 利用 `babel-traverse` 这个独立的包对 AST 进行遍历，并解析出整个树的 path，通过挂载的 metadataVisitor 读取对应的元信息，这一步叫 set AST 过程
3. transform 过程：遍历 AST 树并应用各 transformers（plugin） 生成变换后的 AST 树
4. 利用 babel-generator 将 AST 树输出为转码后的代码字符串

> 注：以上面的代码片断为例，为了详细了解到整个编译过程，可以使用 `DEBUG=babel node main.js` 运行代码，这样就可以看到整个过程中的输出日志了。

babel 的 AST 生成是直接使用 babylon 这个单独的 [AST](https://github.com/babel/babylon/blob/master/ast/spec.md) 解析器包，它基于 ESTree 规范，这里不对 AST 本身做过多的解释，说白了，就是整个源代码可以分解成一个树状结构，其中会有表达式、函数等，而每个表达式则又由变量和运算符组成，以此类推，每个叶子结点将会最细粒度的元素。具体的可以参考线上[一个 AST 可视化的例子](http://astexplorer.net/#/Z1exs6BWMq)。

基本的树的遍历，分为 DFS 和 BFS。AST 树的遍历使用 DFS，对于每个结点，有进入结点和退出结点两个时刻（对应于递归调用的入栈与出栈），所以我们可以在这两个时机访问结点。

由于前面通过 `babel-traverse` 已经对树进行了处理，在访问 AST 树的时候，每次访问到某种类型的时候，就会使用对应类型的插件。如访问到二元操作符时，我们自定义的 `BinaryExpression` 就会被调用到。而至于我们需要基于该结点做什么操作，babel 把所需要的信息都暴露在了接口中。

### 插件

在介绍插件之前，需要先说明一下 plugin 和 preset 这两个概念。

plugins 的插件使用顺序是顺序的，而 preset 则是逆序的。

有了上面的一些概念，再看下 babel 的插件机制，编写一个可用的 babel 插件就会相对简单很多了。

```javascript
// #MyPlugin.js
module.exports = function MyPlugin(babel) {
  return {
    visitor: {
      BinaryExpression: function (path) {
        if (path.node.operator !== "===") {
          return;
        }
        path.node.left = babel.types.identifier("sebmck");
        path.node.right = babel.types.identifier("dork");
      }
    }
  };
}

// #main.js
const babel = require("babel-core")

// const code = `const noop = () => {}`
const code = `foo === bar;`;

const result = babel.transform(code, {
  plugins: ['./MyPlugin'],
  presets: ['es2015']
})

console.log(result.code)
```

ref: <https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md>