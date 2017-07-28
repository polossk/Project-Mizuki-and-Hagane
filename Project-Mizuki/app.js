// SET DEBUG=mizuki:* & npm start

// 加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var User = require('./models/user');
var Const = require('./models/constant');

// 创建项目实例
var app = express();

// 定义渲染引擎 pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// favicon.ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 定义日志和输出级别
app.use(logger('dev'));

// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 定义 cookie 解析器
app.use(cookieParser());
app.use(session({
	secret: 'hello! Mizuki desu!',
	resave: false, saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());

// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由控制
var index = require('./routes/index');
var active = require('./routes/active');
var resetpasswd = require('./routes/resetpasswd');

// 匹配路径和路由
app.use('/', index);
app.use('/active', active);
app.use('/resetpasswd', resetpasswd);

// mongo database setting
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://username:password@localhost:23333/test?authSource=admin');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	if (req.app.get('env') === 'development') {
		res.status(err.status || 500);
		res.render('error');
	} else {
		estatus = err.status || 500;
		switch (estatus) {
			case 404: case 500: case 501:
			case 502: case 503: case 504:
			case 505: res.redirect('/' + estatus); break;
			default: res.redirect('/503');
		}
	}
});

module.exports = app;