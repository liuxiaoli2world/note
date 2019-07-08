# secure配置

1. secureCRT中文乱码

   在SecureCRT中选择Options->Session Options菜单，选择外观，选择编码方式为UTF-8即可。

2. secureFX中文乱码

   在SecureFX中选择Options->Global Options菜单，在打开的Global Options的对话框中选择General。有一个Configuration folder。里面的路径就是SecureFX的配置文件路径。在Sessions子目录下找到对应的Session的ini配置文件。在里面将"Filenames Always Use UTF8"=00000000修改为"Filenames Always Use UTF8"=00000001保存重新连接即可。

