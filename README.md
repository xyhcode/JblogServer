# BlogServer

#### 介绍
简易博客API接口

#### 软件架构
Node.js+MySQL+Express

#### 项目整体文件说明
- `bin` 可执行文件
  - `www` 基本配置（端口...）
- `db` 配置文件目录
  - `blogserver.sql` 数据库文件
  - `config.js` 数据库配置
  - `index.js` 封装数据库方法 连接
- `public` 静态资源
  - `uploads` 上传的头像
- `node_modules` 项目依赖的第三方模块
- `routes` 统一路由
  - `constant.js` 变量常量（md5秘钥...）
  - `index.js` 封装的工具方法
- `app.js` 主项目入口文件
- `package.json` 项目配置文件

#### 安装教程
#####  本地环境
Node.js+MySQL
#####  创建数据库
数据库文件在：db->blogserver.sql
数据库连接名：root 密码：root
可在db->config.js修改

#####  启动项目
安装依赖：npm install
启动项目：npm start
