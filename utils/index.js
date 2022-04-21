const crypto=require('crypto')

//密码加密
function md5(str){
    //参数为String类型
    return crypto.createHash('md5').update(String(str)).digest('hex')
}

module.exports={
    md5
}
