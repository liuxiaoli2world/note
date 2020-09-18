# Egg.js 搭建开发环境 -- 前后端分离 + swagger文档 搭好就直接开发API

## 前言

>  使用express和koa2开发api都比较自由没有一个统一的开发规范，并且让初学者学起来感觉有点混乱,使用egg.js开发api有一种用vue开发的感觉非常舒服,但是使用egg.js其实里面还有挺多道道的，搭个开发环境顺便学习一下egg.js不是美滋滋。

## 1.搭建egg.js脚手架

egg.js 快速入门

```shell
mkdir egg-example && cd egg-example
cnpm init egg --type=simple
cnpm i
npm run dev
```

open http://localhost:7001

## 2.跨域配置

`cnpm i egg-cors --save`

```javascript
// app/config/plugin.js
exports.static = true;
// 跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// app/config/config.default.js
  // 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
```



## 3.安装egg-swagger-doc

`cnpm i egg-swagger-doc --save`
egg-swagger-ui文档

```javascript
// app/config/plugin.js
// swagger文档
exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};
```

```javascript
// app/config/config.default.js
  // swagger文档配置
  config.swaggerdoc = {
    dirScanner: './app/controller', //插件扫描的文档路径
    apiInfo: {
      title: 'swagger文档',
      description: 'egg.js swagger-demo文档',
      version: '1.0.0',
    },
    consumes: ['application/json','multipart/form-data'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: ['application/json','multipart/form-data'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    schemes: ['http', 'https'],
    routerMap: true, // 是否自动生成route
    enable: true,
  };
```

```javascript
// app/router.js
'use strict';
/**
- @param {Egg.Application} app - egg application
  */
module.exports = app => { 
 //重定向到swagger-ui.html
  app.router.redirect('/', '/swagger-ui.html', 302);
}
```

### 3.1 在app目录下新建文件夹 contract（必须） 和 service（备用）

#### - 在contract目录下新建目录response 和 request 目录

#### - 在response目录下新建base.js

```javascript
// app/contract/response/base.js
'use strict';
module.exports = {
  // 测试模块
  testResponse: {
    message: { type: 'string' }
  }
};
```
设置一下测试

###  3.2 在controller目录下把home.js改成test.js

```javascript
'use strict';
const Controller = require('egg').Controller;
/**
 * @Controller 测试
 */
class TestController extends Controller {
    /**
      * @summary 接口测试
      * @description 测试swagger文档是否可用
      * @router get /api/v1/test
      * @request query string str 随机字符串
      * @response 200 testResponse
      */
    async test() {
        const { ctx } = this;    
        const str = ctx.query.str    
        ctx.body = await {
            message: 'swagger is OK!!! and query is:' + str
        }
    }
}
module.exports = TestController;
```
休息一下....npm run dev 跑一下看看能跑动不 如能出现swagger界面就继续
输入127.0.0.1:7001

## 4. 设置调试

egg.js调试文档

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Egg",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": { "runtimeExecutable": "npm.cmd" },
      "runtimeArgs": [ "run", "debug" ],
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 9229,
      "autoAttachChildProcesses": true
    }
  ]
}
```
## 6.安装mysql

mysql安装方法

## 7.初始化数据库

初始化三个数据 开发环境数据库 测试环境数据库 生产环境数据库

```shell
mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS dev_db;'
mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS test_db;'
mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS pord_db;'
```

没有密码的话可以把 -p 去掉
在vscode里面搞

可以看到数据库初始化了

## 8.安装egg-sequelize sequelize-cli mysql2

```shell
cnpm install --save egg-sequelize mysql2
cnpm install --save-dev sequelize-cli
```


egg-sequelize文档
mysql2文档
sequelize-cli文档
egg.js sequelize教程
使用 sequelize-cli 可以创建模型和迁移文件 同步到数据库中 （但是我不这样做）

```javascript
// app/config/plugin.js
// sequelize ORM
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// app/config/config.default.js
  // 访问数据库
  config.sequelize = {
    dialect: 'mysql', // 数据库类型，支持 mysql，sqlite,mssql,pgsql,oracle。
    host: '127.0.0.1', // 数据库服务器地址。
    port: 3306, // 数据库连接端口号。
    database: 'dev_db', // 数据库名称。
    username: "root", // 数据库登录用户名。
    password: "111111", // 数据库登录密码。
    timezone: '+08:00', // 时区 东八区
    underscored: true,// 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    define: {
      freezeTableName: true, // Model 对应的表名将与model名相同。
      timestamps: false // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。
    }
  };
```



### 8.1 在 egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在 database 目录下，所以我们在项目根目录下新建一个 .sequelizerc 配置文件：

```javascript
'use strict';
const path = require('path');
module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

### 8.2 初始化 Migrations 配置文件和目录

```shell
npx sequelize init:config
npx sequelize init:migrations
```

### 8.3 如果出现了database目录 那这一步就操作成功了。

执行完后会生成 database/config.json 文件和 database/migrations 目录，我们修改一下 database/config.json 中的内容，将其改成我们项目中使用的数据库配置：
根据egg.js对数据库的环境配置

```json
{

  "development": {
    "username": "root",
    "password": 111111,
    "database": "dev_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00"
  },

  "test": {
    "username": "root",
    "password": 111111,
    "database": "test_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00"
  },

  "production": {
    "username": "root",
    "password": 111111,
    "database": "prod_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+08:00"
  }
}

```



到了这一步就可以建模型（表）了

sequelize-cli操作流程

## 9.安装 egg-sequelize-auto

但是我在网上找到了一个叫做 egg-sequelize-auto 的东东，可以自动对照数据库表生成模型
个人感觉在sequelize生成模型操作比较复杂,一般都是在外面把表设计好之后再开始写模型的
通过表自动生成模型不是美滋滋~~~

`cnpm install -g egg-sequelize-auto`
egg-sequelize-auto文档

刚我们安装过mysql2了 但是是安装在--save
这里是全局安装 还需要全局安装一个mysql2

`cnpm install mysql2 -g`

-o 表示生成 models 的路径，-h 表示主机，-p 表示端口，-d 表示数据库， -u 表示用户名，-x 表示密码 -e 表示数据库

```json
// package.json
// 在scripts里添加
 "scripts": {
    "dev_db": "egg-sequelize-auto -o ./app/model -h 127.0.0.1 -p 3306 -d dev_db -u root -x 111111 -e mysql",
    "test_db": "egg-sequelize-auto -o ./app/model -h 127.0.0.1 -p 3306 -d dev_db -u root -x 111111 -e mysql",
    "pord_db": "egg-sequelize-auto -o ./app/model -h 127.0.0.1 -p 3306 -d dev_db -u root -x 111111 -e mysql",
  }
```

在package.json的scripts里创建3条命令,分别对应刚刚初始化的3个环境的数据库。
生产环境 : dev_db
测试环境 : test_db
生产环境 : pord_db
接着我们使用可视化数据库创个user表(万金油表)这样比较直观


user表

然后我们跑一下
`npm run dev_db`
如果在app目录下出现model文件夹下有个user.js那就是模型创建成功啦！

## 10.写一个新增用户的控制器来对swagger和sequelize熟悉一下

### 10.1 --- 在controller目录下新建user.js 写一个新增user的方法

```json
// vscode可以设置api快速代码片段 @@直接提示
{
    "swaggerApi": {
        "scope": "javascript,typescript",
        "prefix": "@@",
        "body": [
            "/**",
            "* @summary 接口详情",
            "* @router get|post /api/v1/$1",
            "* @Request body|query 请求体",
            "* @response 200 baseResponse",
            "*/",
            "async 方法名() {",
            "   const { ctx, service } = this;",
            "   ctx.validate(ctx.rule.请求体, ctx.request.body|ctx.query);",
            "   ctx.body = await service.模块.方法名()",
            "}"
        ],
        "description": "swaggerApi快速创建"
    }
}
```



```javascript
// app/controller/user.js
'use strict';
const Controller = require('egg').Controller;
/**
- @Controller 用户模块
  */
  class UserController extends Controller {
  /**
  - @summary 创建用户
  - @router post /api/v1/create-user
  - @Request body createUserReq
  - @response 200 baseResponse
    */
    async create() {
      const { ctx, service } = this;
      // 参数验证
      ctx.validate(ctx.rule.createUserReq, ctx.request.body);
      ctx.body = await service.user.createUser()
    }
}
module.exports = UserController;
```

然后在app/contract/request目录下新建一个user.js
用作swagger获取参数后的对参数的验证
根据app/model/user.js的模型创建验证参数模型

```javascript
// app/contract/request/user.js
'use strict';
module.exports = {
    // 创建用户参数
    createUserReq: {
        phone: {
            type: 'string',
            example: '13723456789',
            format: /^1[34578]\d{9}$/,
            description: '电话',
            required: true
        },
        password: {
            type: 'string',
            example: '密码',
            maxLength:'36',
            required: true
        },
        name: {
            type: 'string',
            example: '姓名',
            maxLength:'10',
            required: true
        },
        sex: {
            type: 'string',
            enum: ['M', 'F'],
            description: '性别 M:男 F:女'
        },
        balance: {
            type: 'number',
            example: 666.66,
            description: '金额'
        }
    }
};
```



## 安装egg-validate

`cnpm i egg-validate --save`
鸡蛋验证文档

```javascript
// app/config/plugin.js
// 验证方案
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

```

安装 moment.js（处理时间的工具）+ uuid (自动生成id)
`cnpm i moment uuid --save`
momentjs中文网
在app目录下新建扩展文件夹extend 取名为helper.js
通过 ctx.helper 访问到 helper 对象

```javascript
// app/extend/helper.js
const moment = require('moment');
moment.locale('zh-cn')
exports.Date = v => moment()
exports.zhDate = v => moment().format('lll')
```


编写user服务

```javascript
// app/service/user.js

'use strict';
const Service = require('egg').Service;
const UUID = require('uuid');
class UserService extends Service {

  /**

- @创建用户
  */
    async createUser() {
    const { ctx } = this
    try {    
      const id = UUID.v1()
      const class_id = null
      return await ctx.model.User.create({ id, class_id, ...ctx.request.body });    
    } catch (error) {
    
      // 记录错误日志
      this.logger.error(`${ctx.helper.zhDate()} : user服务创建时发生错误 --- ${error}`)
      const errorBody = {
        code: 5000,
        data: null,
        message: '参数有毒:' + error
      }
      return errorBody
    }

  }

}

module.exports = UserService;
```




此时创建用户的服务就写好了
可以使用swagger里的try it out测试接口


测试

如果出现错误日志也会自动打印
在logs文件夹下可以找到错误的日志