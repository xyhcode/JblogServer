var express = require('express');
var router = express.Router();
const querysql=require('../db/index')
const moment = require("moment");

/**
 * 发表评论
 */
router.post('/isscomment',async (req, res, next) => {
    //获取评论内容和文章ID
    let {cocontext, articleid} = req.body;
    //取出token中的用户ID
    let usid = req.auth.sinresult.id;
    //获取当前时间格式化
    let time=moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
    try {
        let result = await querysql('insert into comment(cocontext,userid,articleid,createtime)values(?,?,?,?)',[cocontext,usid,articleid,time]);
        res.send({
            code:201,
            msg:'评论成功！'
        })
    } catch (e) {
        next(e);
    }
});

/**
 * 获取文章评论
 */
router.get('/:id',async (req, res, next)=>{
    //获取路径参数ID
    let arid=req.params.id;
    try {
        let result=await querysql('select a.id,a.cocontext,b.nickname,b.headimg,a.createtime from comment as a INNER JOIN user as b on a.userid=b.id where a.articleid=?',[arid]);
        //console.log(result);
        res.send({
            code: 200,
            msg: '获取成功！',
            data:result
        })
    }catch (e) {
        next(e);
    }
})

module.exports=router
