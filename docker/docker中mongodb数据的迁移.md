## 容器数据迁移

接下来，我们先停止刚才创建的 docker_mongodb 容器，命令如下：

```shell
docker stop docker_mongodb
```

然后我们再创建一个新的 MongoDB 容器，挂载刚才刚刚的数据目录，命令如下：

```shell
docker run -p 27017:27017 -v <LocalDirectoryPath>:/data/db --name docker_mongodb_migration -d mongo
```

我们可以容器查询命令，查看当前 Docker 的容器状态，命令如下：

```shell
docker container ls -a
```

这里的 `-a` 参数是查看所有的容器，包括已经停止的容器。

 我们可以从输出结果看到，这时 `docker_mongodb` 的状态是 Exited，表示已经退出，而新创建的 `docker_mongodb_migration` 的状态显示为 Up，表明数据库正在运行。

然后我们再打开 RoBo 3T，连接数据库，可以看到我们看到我们再 `docker_mongodb` 中创建的数据，这里表明我们新创建的 `docker_mongodb_migration` 挂载的数据目录和 `docker_mongodb` 相同，利用这一方法，我们可以实现简单的数据迁移。