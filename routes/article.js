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
 * 得到文章详情
 */
router.get('/detail',async (req, res, next) => {
  //获取文章ID
  let artid = req.query.id;
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
});

/**
 * 我的文章
 */
router.get('/',async (req, res,next) => {
  //取出token中的用户ID
  let usid = req.auth.sinresult.id;
  //console.log(usid);
  try {
    let result=await querysql('select * from article where userid=? ',[usid]);
    //console.log(result);
    res.send({
      code:200,
      msg: '获取成功！',
      data: result
    })
  }catch (e) {
    next(e);
  }
});

/**
 * 删除文章
 */
router.delete('/:id',async (req, res, next) => {
  //获取文章ID
  let artid = req.params.id;
  //取出token中的用户ID
  let usid = req.auth.sinresult.id;
  try {
    let result = await querysql('delete from article where id=? and userid=?', [artid, usid]);
    console.log(result);
    res.send({
      code: 204,
      msg: '删除成功！'
    })
  } catch (e) {
    next(e);
  }
});

/**
 * 获取所有文章
 */
router.get('/allartlist',async (req, res, next) => {
  try {
    let result = await querysql('select b.id,b.title,b.arcontext,a.nickname,a.headimg,b.createtime from user as a INNER JOIN article as b ON a.id=b.userid');
    console.log(result);
    res.send({
      code:200,
      msg: '获取成功！',
      data:result
    })
  }catch (e) {
    next(e);
  }
});

/**
 * 更新博客
 */
router.put('/editarticle',async (req, res, next)=>{
  //获取需改的内容
  let {id,title,arcontext}=req.body;
  //取出token中的用户ID
  let usid = req.auth.sinresult.id;
  try {
    let result = await querysql('update article set title=?,arcontext=? where id=? and userid=?',[title,arcontext,id,usid]);
    let sealinfo=await querysql('select * from article where id=? and userid=?',[id,usid]);
    res.send({
      code: 200,
      msg: '更新成功！',
      data:sealinfo[0]
    })
  }catch (e) {
    next(e);
  }
});
module.exports = router;
