var express = require('express');
var router = express.Router();
const querysql=require('../db/index')
const moment=require('moment')
/**
 * 新增博客
 */
router.post('/addarticle', async (req, res, next)=>{
  //获取标题、文章内容
  let {title,arcontext}=req.body;
  //取出token中的用户ID
  let usid=req.auth.sinresult.id;
  let time=moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
  console.log(time);
  try{
    let result=await querysql('insert into article(title,arcontext,createtime,userid) values(?,?,?,?)',[title,arcontext,time,usid]);
    //console.log(result);
    let seall=await querysql('select * from article where id=?',[result.insertId]);
    //console.log(seall);
    res.send({
      code: 201,
      msg: '添加成功！',
      data:seall[0]
    })
  }catch (e) {
    next(e);
  }
});

/**
 * 得到文章信息
 */

module.exports = router;
