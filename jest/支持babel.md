# jest支持babel

1. 默认同 `nodejs` 一样不支持 `import` 语法，安装  `babel-jest`  、 `babel-core` 、`babel-preset-env`

``` bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

2. 添加 `.babelrc` 文件，配置如下：

``` json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

