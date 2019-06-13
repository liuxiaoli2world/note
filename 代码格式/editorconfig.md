# editorconfig 在 vscode 中的使用

配置参考网址：<https://editorconfig.org/#example-file>

配置步骤：

1. 全局安装 npm install -g editorconfig
2. vscode安装插件 editorconfig
3. 项目目录创建 .editorconfig文件

注： vscode自动识别“.editorconfig”文件

实例：

```ini
# EditorConfig is awesome: http://EditorConfig.org
 
# top-most EditorConfig file
root = true
 
# Unix-style newlines with a newline ending every file
[*]
end_of_line = crlf
insert_final_newline = true
 
# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8
 
# 4 space indentation
[*.py]
indent_style = space
indent_size = 4
```

