var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var mailer = require('../utils/mailer.js');
passport.use(User.createStrategy());

/* GET users listing. */
router.get('/:resetToken', function(req, res, next) {
	// 找到激活码对应的用户
	User.findOne({
		resetToken: req.params.resetToken, resetExpires: {$gt: Date.now()} }, function (err, user) {
		if (err) return next(err);

		// 激活码无效
		if (!user) {
			return res.render('message', {
				msg_title: '密码重置失败',
				msg_content: '您的密码重置链接已过期，请重新申请',
				msg_return: '/../',
				msg_return_hint: '返回登陆页面'
			});
		}

		// 激活并渲染重置密码界面
		user.reset = true;
		user.save(function (err, user) {
			if (err) return next(err);
			return res.render('resetpasswd', { email: user.username, token: req.params.resetToken });
		});
	});
});

router.post('/requesting', function(req, res, next) {
	User.findOne( { resetToken: req.body.token, resetExpires: {$gt: Date.now()}	}, function (err, user) {
		if (err) return next(err);

		if (!user) {
			return res.render('message', {
				msg_title: '密码重置失败',
				msg_content: '您的密码重置链接已过期，请重新申请',
				msg_return: '/../',
				msg_return_hint: '返回登陆页面'
			});
		}

		var username = req.body.username,
			password = req.body.password;

		User.update(
			{username: username}, {$set:{ resetToken: "" }},
			function(err, user) { if (err) return next(err); }
		);

		user.save(function(err, user) { if(err) return next(err); });

		User.findByUsername(username).then(function(sUser) {
			if (sUser)
			{
				sUser.setPassword(password, function() {
					sUser.save();
					return res.render('message', {
						msg_title: '密码重置成功',
						msg_content: '请用新密码登陆',
						msg_return: '/../',
						msg_return_hint: '返回登录页面'
					});
				});
			}
			else
			{
				return res.render('message', {
					msg_title: '密码重置失败',
					msg_content: '您的密码重置链接已过期，请重新申请',
					msg_return: '/../',
					msg_return_hint: '返回登陆页面'
				});
			}
		});
	});
});

module.exports = router;
