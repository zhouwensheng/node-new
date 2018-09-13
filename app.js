var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var app = express();
app.use(require('cors')({credentials: true, origin: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('sessiontest'));
app.use(session({
  secret: 'sessiontest',//与cookieParser中的一致
  resave: false,
  saveUninitialized:true,
  cookie: {
    maxAge: 3600 * 1000  // 有效期，单位是毫秒
  }
 }));
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.send(200);/*让options请求快速返回*/
  else next();
});
var users = require('./routes/users');
var picture = require('./routes/picture');
var music = require('./routes/music');
var book = require('./routes/book');
var view = require('./routes/view');
var Email = require('./routes/Email');
var uploading = require('./routes/uploading');
app.use('/users', users);

// 权限
app.use(function (req, res, next) {
    if (!req.session.name) {
      return res.send(401)
    } else {
        next()
    }

})
app.use('/picture', picture);
app.use('/music', music);
app.use('/book', book);
app.use('/view', view);
app.use('/Email', Email);
app.use('/upload', uploading);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3333)
module.exports = app;
