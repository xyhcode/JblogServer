# 1. 简易博客 API 接口文档

## 1.1. API 接口说明

- 接口基准地址：`http://127.0.0.1:3000/api/`
- 服务端已开启 CORS 跨域支持
- API  认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |
| -1       | user exits            | 用户已注册 \|\| 用户不存在                          |

------

## 1.2. 注册

### 1.2.1. 用户注册

- 请求路径：users/register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |
| nickname | 用户昵称 | 不能为空 |
| headimg  | 用户头像 | 可以为空 |

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| id       | 用户 ID      |      |
| username | 用户名       |      |
| password | 密码         |      |
| nickname | 用户昵称     |      |
| headimg  | 用户头像地址 |      |

- 响应数据

```json
{
    "code": 201,
    "msg": "注册成功！",
    "data": {
        "id": 1008,
        "username": "admin8",
        "password": "a6d08e7766a732e6e9036d5e973ef640",
        "nickname": "羡羡8",
        "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png"
    }
}
```

## 1.3.登入

### 1.3.1.用户登入

- 请求路径：users/login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |
| headimg  | 用户头像 | 可以为空 |

- 响应参数

| 参数名   | 参数说明     | 备注    |
| -------- | ------------ | ------- |
| id       | 用户 ID      |         |
| username | 用户名       |         |
| password | 密码         |         |
| nickname | 用户昵称     |         |
| headimg  | 用户头像地址 |         |
| Token    | Token        | 基于JWT |

- 响应数据

```json
{
    "code": 200,
    "msg": "登入成功！",
    "data": {
        "id": 1008,
        "username": "admin8",
        "password": "a6d08e7766a732e6e9036d5e973ef640",
        "nickname": "羡羡8",
        "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJlcyI6W3siaWQiOjEwMDgsInVzZXJuYW1lIjoiYWRtaW44IiwicGFzc3dvcmQiOiJhNmQwOGU3NzY2YTczMmU2ZTkwMzZkNWU5NzNlZjY0MCIsIm5pY2tuYW1lIjoi576h576hOCIsImhlYWRpbWciOiJodHRwczovL2dpdGVlLmNvbS94eWhjb2RlZmlsdGVyL3BpYy1nby9yYXcvZDUxNGQ4OTEzYzg3M2IzYzg2MzI5Y2I3ZDZmMGNmYmQxOGFiYWI5NS9pbWFnZS8yMDIyMDQyMTIwNTc5NDEucG5nIn1dLCJpYXQiOjE2NTA2MTc3NjEsImV4cCI6MTY1MDcwNDE2MX0.Iud832_G20Ry6qTjECjcMI_2ffsnuyS7VBQEg14WLOI"
    }
}
```

## 1.4.用户信息

- 请求路径：users/info
- 请求方法：get

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| id       | 用户 ID      |      |
| username | 用户名       |      |
| nickname | 用户昵称     |      |
| headimg  | 用户头像地址 |      |

- 响应数据

```json
{
    "code": 200,
    "msg": "用户信息获取成功！",
    "data": {
        "id": 1002,
        "username": "admin2",
        "nickname": "羡羡",
        "headimg": null
    }
}
```

## 1.5.头像上传

- 请求路径：users/uploads
- 请求方法：post
- 响应数据

```json
{
"code": 201,
"msg": "上传成功！",
"data": "http://127.0.0.1:3000/uploads/20220423/1650704068472.png"
}
```

## 1.6.用户信息更新

- 请求路径：users/updateuser
- 请求方法：put
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| nickname | 用户昵称 | 不能为空 |
| headimg  | 用户头像 | 不能为空 |

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| id       | 用户 ID      |      |
| username | 用户名       |      |
| nickname | 用户昵称     |      |
| headimg  | 用户头像地址 |      |

- 响应数据

```json
{
    "code": 200,
    "msg": "更新成功！",
    "data": {
        "id": 1002,
        "username": "admin2",
        "nickname": "羡羡2",
        "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png"
    }
}
```

## 1.7.添加文章

- 请求路径：article/addarticle
- 请求方法：post
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| title     | 文章标题 | 不能为空 |
| arcontext | 文章内容 | 不能为空 |

- 响应参数

| 参数名     | 参数说明 | 备注                |
| ---------- | -------- | ------------------- |
| id         | 用户 ID  |                     |
| title      | 文章标题 |                     |
| arcontext  | 用户内容 |                     |
| createtime | 创建时间 |                     |
| userid     | 用户ID   |                     |
| state      | 删除状态 | 0未删除 1删除 默认0 |

- 响应数据

```json
{
    "code": 201,
    "msg": "添加成功！",
    "data": {
        "id": 7,
        "title": "vue2",
        "arcontext": "测试",
        "createtime": "2022-04-23T12:00:08.000Z",
        "userid": 1002,
        "state": 0
    }
}
```

## 1.8.获取文章详情

- 请求路径：article/detail
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 文章id   | 不能为空 |

- 响应参数

| 参数名     | 参数说明 | 备注                |
| ---------- | -------- | ------------------- |
| id         | 用户 ID  |                     |
| title      | 文章标题 |                     |
| arcontext  | 用户内容 |                     |
| createtime | 创建时间 |                     |
| userid     | 用户ID   |                     |
| state      | 删除状态 | 0未删除 1删除 默认0 |

- 响应数据

```json
{
    "code": 200,
    "msg": "获取成功！",
    "data": {
        "id": 2,
        "title": "vue入门",
        "arcontext": "<h1>测试vue</h1>",
        "createtime": "2022-04-23T11:21:44.000Z",
        "userid": 1002,
        "state": 0
    }
}
```

## 1.9.获取用户所有文章

- 请求路径：article
- 请求方法：get

- 响应参数

| 参数名     | 参数说明 | 备注                |
| ---------- | -------- | ------------------- |
| id         | 用户 ID  |                     |
| title      | 文章标题 |                     |
| arcontext  | 用户内容 |                     |
| createtime | 创建时间 |                     |
| userid     | 用户ID   |                     |
| state      | 删除状态 | 0未删除 1删除 默认0 |

- 响应数据

```json
{
    "code": 200,
    "msg": "获取成功！",
    "data": [
        {
            "id": 1,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T10:44:21.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 2,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T11:21:44.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 3,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T11:22:02.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 4,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T11:23:49.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 5,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T11:30:35.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 6,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "createtime": "2022-04-23T11:55:08.000Z",
            "userid": 1002,
            "state": 0
        },
        {
            "id": 7,
            "title": "vue2",
            "arcontext": "测试",
            "createtime": "2022-04-23T12:00:08.000Z",
            "userid": 1002,
            "state": 0
        }
    ]
}
```

## 2.0.删除文章

- 请求路径：article/:id
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 文章id   | 不能为空 |

- 响应数据

```json
{
    "code": 204,
    "msg": "删除成功！"
}
```

## 2.1.获取所有文章

- 请求路径：article/allartlist
- 请求方法：delete
- 响应数据

| 参数名     | 参数说明     | 备注     |
| ---------- | ------------ | -------- |
| id         | 文章id       | 不能为空 |
| title      | 文章标题     |          |
| nickname   | 作者名字     |          |
| headming   | 作者头像     |          |
| createtime | 文章发布时间 |          |

- 响应数据

```json
{
    "code": 200,
    "msg": "获取成功！",
    "data": [
        {
            "id": 1,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T10:44:21.000Z"
        },
        {
            "id": 2,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T11:21:44.000Z"
        },
        {
            "id": 3,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T11:22:02.000Z"
        },
        {
            "id": 4,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T11:23:49.000Z"
        },
        {
            "id": 5,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T11:30:35.000Z"
        },
        {
            "id": 6,
            "title": "vue入门",
            "arcontext": "<h1>测试vue</h1>",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-23T11:55:08.000Z"
        }
    ]
}
```

## 2.2.更新文章

- 请求路径：article/editarticle
- 请求方法：put
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| id        | 文章id   | 不能为空 |
| title     | 文章标题 | 不能为空 |
| arcontext | 文章内容 | 不能为空 |

- 响应参数

| 参数名     | 参数说明 | 备注                |
| ---------- | -------- | ------------------- |
| id         | 用户 ID  |                     |
| title      | 文章标题 |                     |
| arcontext  | 用户内容 |                     |
| createtime | 创建时间 |                     |
| userid     | 用户ID   |                     |
| state      | 删除状态 | 0未删除 1删除 默认0 |

- 响应数据

```json
{
    "code": 200,
    "msg": "更新成功！",
    "data": {
        "id": 6,
        "title": "vue1439",
        "arcontext": "测试",
        "createtime": "2022-04-23T11:55:08.000Z",
        "userid": 1002,
        "state": 0
    }
}
```

## 2.3.发布评论

- 请求路径：comment/isscomment
- 请求方法：post
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| articleid | 文章id   | 不能为空 |
| cocontext | 评论内容 | 不能为空 |

- 响应数据

```json
{
    "code": 201,
    "msg": "评论成功！"
}
```

## 2.4.获取文章评论

- 请求路径：comment/:id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| id     | 文章id   | 不能为空 |

- 响应参数

| 参数名     | 参数说明   | 备注 |
| ---------- | ---------- | ---- |
| id         | 评论ID     |      |
| cocontext  | 评论的内容 |      |
| nickname   | 评论昵称   |      |
| headimg    | 评论人头像 |      |
| createtime | 评论时间   |      |

- 响应数据

```json
{
    "code": 200,
    "msg": "获取成功！",
    "data": [
        {
            "id": 1,
            "cocontext": "测试01",
            "nickname": "羡羡2",
            "headimg": "https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png",
            "createtime": "2022-04-24T07:05:07.000Z"
        },
        {
            "id": 3,
            "cocontext": "ces03",
            "nickname": "羡羡3",
            "headimg": null,
            "createtime": "2022-04-05T07:19:14.000Z"
        },
        {
            "id": 4,
            "cocontext": "ces04",
            "nickname": "羡羡4",
            "headimg": null,
            "createtime": "2022-04-15T07:19:30.000Z"
        }
    ]
}
```

