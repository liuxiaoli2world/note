# vscode下搭建Typescript编译环境

[Typescript](http://www.typescriptlang.org/)是微软开发的一个JavaScript的超级。著名前端框架的Angular和HTML5游戏引擎Egret等都选择了Typescript作为编写语言。“工欲善其事，必先利其器”，在学习Typescript语言之前必须要有一个良好的开发环境。这里笔者选择了轻量的Visual Studio Code，此工具具有轻量、跨平台、插件丰富等特点，是一款非常优秀的开发工具。

## 1、首先需要安装Nodejs，安装过程网上很容易搜到，在此不再介绍。安装完成后，在命令窗口输入

```ruby
$ node -v
v8.11.4
```

## 2、安装typescript模块

```ruby
$ npm install -g typescript
```

安装完成后，可以查看typescript模块的版本号

```ruby
$ tsc -v
Version 3.0.3
```

## 3、创建项目目录，在命令窗口中进入该项目目录,创建tsconfig.json。例如项目地址是D:\test\ts。

```ruby
$ D:
$ cd test\ts
$ tsc --init
```

在项目目录下会生成一个tsconfig.json文件

```javascript
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

里面有很多配置项，大家可以根据各自的需要来定制。本文用的示例配置如下,

```javascript
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs'",       
    "outDir": "./js/", 
    "rootDir": "./tscript/", 
    "esModuleInterop": true                   
  }
}
```

新建tscript、js文件夹，分别用作存放typescript、javascript文件。

## 4、测试编译
在Visual studio code中打开ts目录，在tscript目录中新建test.ts文件。

```javascript
class Person {
    hobby: string;
    constructor(hobby: string) {
        this.hobby = hobby;
    }
    echo() {
        return '我就喜欢：' + this.hobby;
    }
}
let person = new Person('看书，习武，书法，旅游');
let hobby = person.echo();
console.log(hobby);
```

然后点击菜单中的Tasks->Run Task。



![img](vs下配置typescript环境.assets/790456-ca03fab322b077ad.webp)

之后会出现tsc:build 、tsc:watch两个选项

![img](vs下配置typescript环境.assets/790456-8dfe9edef08e4878.webp)

其中tsc:build选项是用于一次编译。tsc:watch选项可以监测ts文件的改动，可以进行实时编译，非常方便。经过编译后的文件会存放在之前配置好的js文件目录下。

```javascript
"use strict";
var Person = /** @class */ (function () {
    function Person(hobby) {
        this.hobby = hobby;
    }
    Person.prototype.echo = function () {
        return '我就喜欢：' + this.hobby;
    };
    return Person;
}());
var person = new Person('看书，习武，书法，旅游');
var hobby = person.echo();
console.log(hobby);
```

如此就可以进行Typescript之旅了。

## 5. 问题

命令行用`git`，可能会出现路径找不到的，解决方法是切换命令行为`cmd`即可。

