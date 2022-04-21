let dbOption
dbOption = {
    connectionLimit: 10,
    host: 'localhost',//地址
    user: 'root',//用户名
    password: 'root',//密码
    port: '3306',//端口
    database: 'blogserver'//数据库
}
module.exports = dbOption
