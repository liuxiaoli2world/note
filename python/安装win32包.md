# 安装 win32 包

直接在命令行执行 `pip install win32gui` 报错，查[资料](<https://stackoverflow.com/questions/20113456/installing-win32gui-python-module>)发现以下步骤：

```bash
#See this link: http://www.lfd.uci.edu/~gohlke/pythonlibs/#pywin32. It may be of help to you.
#EDIT: (easy version)

Step 1: Download the pywin32....whl
Step 2: pip install pywin32....whl
Step 3: C:\python32\python.exe Scripts\pywin32_postinstall.py -install
Step 4: python
>>> import win32gui
```

下载文件路径为： [win32下载路径](<https://www.lfd.uci.edu/~gohlke/pythonlibs/#pywin32>)

本地python环境是 3.7.2，下载的 `pypiwin32-224+dummy-py2.py3-none-any.whl`;

```
pip install d:\\pypiwin32-224+dummy-py2.py3-none-any.whl
```

然后程序验证通过。
