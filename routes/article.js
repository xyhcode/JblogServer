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
  //获取当前时间格式化
  let time=moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
  //console.log(time);
  try{
    //添加数据
    let result=await querysql('insert into article(title,arcontext,createtime,userid) values(?,?,?,?)',[title,arcontext,time,usid]);
    //console.log(result);
    //通过添加后的ID查询文章内容
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
router.get('/:id',async (req, res, next) => {
  //获取文章ID
  let artid = req.params.id;
  //取出token中的用户ID
  let usid = req.auth.sinresult.id;
  try {
    //查询文章的信息
    let result = await querysql('select * from article where id =? and userid=?', [artid, usid]);
    res.send({
      code: 200,
      msg:'获取成功！',
      data: result[0]
    })
  } catch (e) {
    next(e);
  }
})

module.exports = router;
