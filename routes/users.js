var express = require('express');
var router = express.Router();
const querysql=require('../db/index')
const {PWD_SALT,PRIVATE_KEY,EXPIRED}=require('../utils/constant')
const {md5}=require('../utils/index')
const jwt=require('jsonwebtoken')

/**
 * 注册
 */
router.post('/register', async (req, res, next)=>{
  //获取前台的数据
  let {username, password,nickname,headimg} = req.body;
  //为空就给默认的头像
  headimg=headimg || 'https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png'
  console.log(username,password,nickname,headimg);
  //查询用户是否注册
  try {
    //根据用户名查询用户是否注册
    let user=await querysql('select * from user where username = ?',[username]);
    //没有注册
    if(user.length === 0){
      //加密
      password=md5(`${password}${PWD_SALT}`);
      //添加用户
      let regresult=await querysql('insert into user (username,password,nickname,headimg) values (?,?,?,?)',[username,password,nickname,headimg]);
      //查询添加后的用户信息
      let userinfo=await querysql('select * from user where id=?',[regresult.insertId]);
      //返回信息
      res.send({
        code: 201,
        msg:'注册成功！',
        data:userinfo[0]
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

/**
 * 登入
 */
router.post('/login',async (req,res,next) => {
  let {username, password} = req.body;
  try{
    //根据用户名查询用户是否注册
    let user=await querysql('select * from user where username = ?',[username]);
    //没有找到
    if(user.length === 0){
      res.send({
        code:-1,
        msg:'用户不存在！'
      });
    }else{
      //加密
      password=md5(`${password}${PWD_SALT}`);
      //查询验证账号密码是否正确
      let seres=await querysql('select * from user where username = ? and password = ?',[username,password]);
      //没有找到
      if(seres.length === 0){
        res.send({
          code:-1,
          msg:'账号或密码不正确！'
        })
      }else{//存在
        //生成token({存的变量},常量token秘钥,{过期时间})
        let token=jwt.sign({seres},PRIVATE_KEY,{expiresIn:EXPIRED});
        //保存返回的数据
        let returnres={
          id: seres[0].id,
          username: seres[0].username,
          password: seres[0].password,
          nickname: seres[0].nickname,
          headimg: seres[0].headimg,
          token:`Bearer ${token}`
        }
        //console.log(returnres);
        res.send({
          code:200,
          msg:'登入成功！',
          data:returnres
        })
      }
    }
  }catch (e) {
    console.log(e);
    //交给中间件
    next(e);
  }
})

module.exports = router;
