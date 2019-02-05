# <h1>data文件夹下文件作用说明</h1>

>该目录用于前端模拟数据，需要全局安装“json-server”。

## db.json是实例数据文件

>在命令行执行 `json-server db.json` 后，在浏览器中
访问`http://localhost:3000/posts/` 得到数据：

```json
[
  {
    "id": 1,
    "title": "json-server",
    "author": "typeCode"
  }
]
```

>访问 `http://localhost:3000/profile/` 得到数据：

```json
{
  "name": "typeCode"
}
```

## faker-data.js文件

>用于生成模拟数据，可以在文件中直接导入使用，也可以读取写在当前目录下的"mock-data.json"文件,在命令行下执行：

```shell
node faker-data.js
```

## tool-json2doc.js文件

>用于根据数据（db.json文件）和模板（tpl.hbs文件）生成对应的api文档（doc.md）；使用“需要本地安装“handlebars”以支持模板语法。在命令行下执行：

```shell
node tool-json2doc.js
```
