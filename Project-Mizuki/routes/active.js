var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var mailer = require('../utils/mailer.js');
passport.use(User.createStrategy());

/* GET users listing. */
router.get('/:activeToken', function(req, res, next) {
	// 找到激活码对应的用户
	User.findOne({
		activeToken: req.params.activeToken,

		// 过期时间 > 当前时间
		activeExpires: {$gt: Date.now()}
	}, function (err, user) {
		if (err) return next(err);

		// 激活码无效
		if (!user) {
			return res.render('message', {
				msg_title: '激活失败',
				msg_content: '您的激活链接无效，请重新注册',
				msg_return: '/../',
				msg_return_hint: '返回注册页面'
			});
		}

		// 激活并保存
		user.active = true;
		user.save(function (err, user) {
			if (err) return next(err);

			// 返回成功
			res.render('message', {
				msg_title: '激活成功',
				msg_content: '已成功激活，请前往登录',
				msg_return: '/../',
				msg_return_hint: '返回登录页面'
			})
		});
	});
});

module.exports = router;
