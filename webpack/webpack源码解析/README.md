# Webpack 源码解析

Webpack 作为前端领域最重要的构建工具,任何一个优秀的前端工程师必定需要对它有比较深入的了解。本系列文章会带您深入理解webpack的实现原理，阅读关键代码，并自己实现一些简单的功能。

这个系列总共包括8篇文章，首先分析我们常用的一些loader，然后看webpack核心代码的工作流程，最后探讨HMR以及tree-shaking等特性。

文章目录：

- [我对webpack的看法以及本系列文章的规划](./1-introduction.md)
- [写一个自己的babel-loader](./2-babel-loader.md)
- [style-loader和css-loader](./3-style-loader-and-css-loader.md)
- [file-loader和url-loader](./4-file-loader-and-url-loader.md)
- [bundle.js内容分析](./5-bundle.js.md)
- [webpack处理流程分析](./6-process-pipe-line.md)
- [HMR热更新原理](./7-hmr.md)
- [Tree shaking](./8-tree-shaking.md)

# 相关源码

所有相关的源码都在这里 [my-webpack-loader](https://github.com/lihongxun945/my-webpack-loader)



