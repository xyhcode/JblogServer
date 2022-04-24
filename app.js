var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');
const {PRIVATE_KEY}=require('./utils/constant');

var articleRouter = require('./routes/article');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comment');
//导入JWT
const {expressjwt: expressJWT} = require("express-jwt");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//使用跨域
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//拦截验证
app.use(expressJWT({
  //自定义的秘钥
  secret:PRIVATE_KEY,
  algorithms: ["HS256"],
}).unless({
  path:[
      '/api/users/register',//白名单 除了这里的地址 其他URL都要验证
      '/api/users/login',
      '/api/users/uploads'
  ]
}))

app.use('/api/article', articleRouter);
app.use('/api/users', usersRouter);
app.use('/api/comment',commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  //token出现异常
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({code:401,msg:'token验证错误！'});
  }else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
