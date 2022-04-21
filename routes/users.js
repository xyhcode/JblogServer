var express = require('express');
var router = express.Router();
const querysql=require('../db/index')
const {PWD_SALT}=require('../utils/constant')
const {md5}=require('../utils/index')

/* 注册接口 */
router.post('/register', async (req, res, next)=>{
  //获取前台的数据
  let {username, password,nickname,} = req.body;
  console.log(username,password,nickname);
  //查询用户是否注册
  try {
    let user=await querysql('select * from user where username = ?',[username]);
    //没有注册
    if(user.length === 0){
      //加密
      password=md5(`${password}${PWD_SALT}`);
      //添加用户
      let regresult=await querysql('insert into user (username,password,nickname) values (?,?,?)',[username,password,nickname]);
      //查询添加后的用户信息
      let userinfo=await querysql('select * from user where id=?',[regresult.insertId]);
      //返回信息
      res.send({
        code: 200,
        msg:'注册成功！',
        data:userinfo
      })
    }else{
      res.send({
        code:-1,
        msg:'用户已注册！'
      });
    }
  }catch (e) {
    console.log(e);
    //交给中间件
    next(e);
  }
});

module.exports = router;
