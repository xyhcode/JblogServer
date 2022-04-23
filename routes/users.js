var express = require('express');
var router = express.Router();
const querysql=require('../db/index')
const {PWD_SALT,PRIVATE_KEY,EXPIRED,IP}=require('../utils/constant')
const {md5,upload}=require('../utils/index')
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
      let userinfo=await querysql('select id,username,nickname,headimg from user where id=?',[regresult.insertId]);
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
        //取出用户的信息
        let sinresult=seres[0];
        //生成token({存的变量},常量token秘钥,{过期时间})
        let token=jwt.sign({sinresult},PRIVATE_KEY,{expiresIn:EXPIRED});
        //保存返回的数据
        let returnres={
          id: seres[0].id,
          username: seres[0].username,
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

/**
 * 得到用户信息接口
 */
router.get('/info',async (req, res, next)=>{
  //console.log(req.auth.sinresult);token中获取用户信息
  let usid=req.auth.sinresult.id;//取出token中的用户ID
  try {
    //查询用户信息
    let usinfo=await querysql('select id,username,nickname,headimg from user where id =?',[usid]);
    res.send({
      code:200,
      msg:'用户信息获取成功！',
      data:usinfo[0]
    });
    //console.log(usinfo);
  }catch (e) {
    next(e);
  }
});

/**
 * 头像上传
 */
router.post('/uploads',upload.single('headimg'),async (req, res, next)=>{
  console.log(req.file);
  //切割路径
  let imgpath=req.file.path.split('public')[1];
  //拼接返回的地址
  let imgurl=`http://${IP}:3000${imgpath}`;
  res.send({
    code:201,
    msg:'上传成功！',
    data:imgurl
  })
})

/**
 * 更新用户信息
 */
router.put('/updateuser',async (req, res, next)=>{
  let usid=req.auth.sinresult.id;//取出token中的用户ID
  //获取数据
  let {nickname,headimg}=req.body;
  try {
    //更新数据
    let result=await querysql('update user set nickname=?,headimg=? where id=?',[nickname,headimg,usid]);
    //console.log(result);
    //从新查询用户信息
    let seresult=await querysql('select id,username,nickname,headimg from user where id=?',[usid]);
    res.send({
      code:200,
      msg: '更新成功！',
      data:seresult[0]
    })
  }catch (e) {
    next(e)
  }
})

module.exports = router;
