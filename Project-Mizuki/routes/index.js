var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Const = require('../models/constant');
var mailer = require('../utils/mailer.js');
var authRequired = require('../utils/auth-required.js');
var crypto = require('crypto');

passport.use(User.createStrategy());

var padding = function(num) {
	return (Array(4).join(0) + num).slice(-4);
};


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'CSCM 2017' });
});

router.get('/index', function(req, res, next) {
	res.redirect('/');
});

router.get('/index.html', function(req, res, next) {
	res.redirect('/');
});

router.get('/404', function(req, res, next) {
	var options = {
		root: __dirname + '/../public/',
		dotfiles: 'deny'
	};
	res.sendFile('404.html', options);
});

router.get('/50[0-5]', function(req, res, next) {
	var options = {
		root: __dirname + '/../public/',
		dotfiles: 'deny'
	};
	var filename = req.url.substring(1, 4);
	res.sendFile(filename + '.html', options);
});


router.get('/home/account', authRequired, function(req, res, next) {
	var u = req.session.user;

	var paid = u.paid, paidconfirm = u.paidconfirm;
	var paidstatus = 0;
	if (u.paid) {
		paidstatus = paidconfirm ? 2 : 1;
	} else {
		paidstatus = 0;
	}
	u.paidstatus = paidstatus;

	switch (u.title)
	{
		case 'prof': u.title_cn = '教授/研究员'; break;
		case 'asprof': u.title_cn = '副教授/副研究员'; break;
		case 'lect': u.title_cn = '讲师/助理研究员'; break;
		case 'stu': u.title_cn = '学生'; break;
		case 'other': u.title_cn = '其他'; break;
	}

	return res.render('asetting', { title: 'CSCM 2017', user: u });
});

router.get('/try*', function(req, res, next) {
	res.redirect('/404/');
});

router.post('/tryprofile', function(req, res, next) {
	var username = req.body.username;
	User.update({ username: username }, {$set:{
			fullname: req.body.fullname,
			school: req.body.school,
			address: req.body.address,
			zipcode: req.body.zipcode,
			cellphone: req.body.cellphone,
			gender: req.body.gender,
			title: req.body.title
		}},
		function(err, user) { if (err) return next(err); }
	);

	req.session.user.fullname = req.body.fullname;
	req.session.user.school = req.body.school;
	req.session.user.address = req.body.address;
	req.session.user.zipcode = req.body.zipcode;
	req.session.user.cellphone = req.body.cellphone;
	req.session.user.gender = req.body.gender;
	req.session.user.title = req.body.title;

	return res.render('message', {
		title: '更新成功',
		msg_title: '更新成功',
		msg_content: '数据已正确更新',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
});


router.post('/tryreport', function(req, res, next) {
	return res.render('message', {
		title: '操作失败',
		msg_title: '操作失败',
		msg_content: '由于数据已经归档, 现在不允许对数据进行修改',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
	
	var username = req.body.username;
	var goingtoreport = req.body.goingtoreport == 'true';
	User.update({ username: username }, {$set:{
			goingtoreport: goingtoreport,
			reporttitle: req.body.reporttitle,
			reportauthor: req.body.reportauthor,
			reportabstract: req.body.reportabstract
		}},
		function(err, user) { if (err) return next(err); }
	);

	req.session.user.goingtoreport = goingtoreport;
	req.session.user.reporttitle = req.body.reporttitle;
	req.session.user.reportauthor = req.body.reportauthor;
	req.session.user.reportabstract = req.body.reportabstract;

	return res.render('message', {
		title: '更新成功',
		msg_title: '更新成功',
		msg_content: '数据已正确更新',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
});


router.post('/tryhotel', function(req, res, next) {
	var username = req.body.username;
	var goingtohotel = req.body.goingtohotel == 'true';

	if (goingtohotel) {
		User.update({ username: username }, {$set:{
				goingtohotel: goingtohotel,
				hotelroom: req.body.hotelroom,
				hoteltime0mm: req.body.hoteltime0mm,
				hoteltime0dd: req.body.hoteltime0dd,
				hoteltime1mm: req.body.hoteltime1mm,
				hoteltime1dd: req.body.hoteltime1dd
			}},
			function(err, user) { if (err) return next(err); }
		);
		req.session.user.goingtohotel = goingtohotel;
		req.session.user.hotelroom = req.body.hotelroom;
		req.session.user.hoteltime0mm = req.body.hoteltime0mm;
		req.session.user.hoteltime0dd = req.body.hoteltime0dd;
		req.session.user.hoteltime1mm = req.body.hoteltime1mm;
		req.session.user.hoteltime1dd = req.body.hoteltime1dd;

	} else {
		User.update({ username: username }, {$set:{
				goingtohotel: goingtohotel,
				hotelroom: '',
				hoteltime0mm: '',
				hoteltime0dd: '',
				hoteltime1mm: '',
				hoteltime1dd: '',

			}},
			function(err, user) { if (err) return next(err); }
		);

		req.session.user.goingtohotel = goingtohotel;
		req.session.user.hotelroom = '';
		req.session.user.hoteltime0mm = '';
		req.session.user.hoteltime0dd = '';
		req.session.user.hoteltime1mm = '';
		req.session.user.hoteltime1dd = '';
	}

	return res.render('message', {
		title: '更新成功',
		msg_title: '更新成功',
		msg_content: '数据已正确更新',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
});


router.post('/trypay', function(req, res, next) {
	var username = req.body.username;
	var paid = req.body.paid == 'true';
	User.update({ username: username }, {$set:{
			paid: paid,
			paidtitle: req.body.paidtitle
		}},
		function(err, user) { if (err) return next(err); }
	);

	req.session.user.paid = paid;
	req.session.user.paidtitle = req.body.paidtitle;

	return res.render('message', {
		title: '更新成功',
		msg_title: '更新成功',
		msg_content: '数据已正确更新',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
});

router.post('/trypaytitle', function(req, res, next) {
	var username = req.body.username;
	var paid = req.body.paid == 'true';
	User.update({ username: username }, {$set:{
			paidtitle: req.body.paidtitle,
			paidtitlenumber: req.body.paidtitlenumber
		}},
		function(err, user) { if (err) return next(err); }
	);

	req.session.user.paidtitle = req.body.paidtitle;
	req.session.user.paidtitlenumber = req.body.paidtitlenumber;

	return res.render('message', {
		title: '更新成功',
		msg_title: '更新成功',
		msg_content: '数据已正确更新',
		msg_return: '/home/account',
		msg_return_hint: '返回上一页面'
	});
});

router.post('/trychangepw', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.npassword;

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

router.post('/trylogin', passport.authenticate('local', { failureRedirect: '/loginfailure' }), function(req, res) {
	req.session.user = req.user;
	req.session.user.authenticated = true;
	res.redirect('/home/account');
});

router.get('/logout', function(req, res) {
	delete req.session.user;
	res.redirect('/');
});

router.get('/loginfailure', function(req, res) {
	return res.render('message', {
		title: '登陆失败',
		msg_title: '登陆失败',
		msg_content: '用户不存在或密码错误',
		msg_return: '/../',
		msg_return_hint: '返回登陆页面'
	});
});

router.post('/tryreg', function(req, res, next) {
	return res.render('message', {
		title: '注册失败',
		msg_title: '注册失败',
		msg_content: '注册时间已到期, 现在不允许注册',
		msg_return: '/../',
		msg_return_hint: '返回登陆页面'
	});
	
	var username = req.body.username;
	var password = req.body.password;

	if (username.length === 0 || password.length === 0) {
		
	}

	// 检查用户名是否存在
	User.register(new User({ username: username }), password, function(err, user) {
		if (err) {
			return res.render('message', {
				title: '注册失败',
				msg_title: '注册失败',
				msg_content: '用户名已存在',
				msg_return: '/../',
				msg_return_hint: '返回注册页面'
			});
		}

		Const.findOne({name: "id"}, function(err, result) {
			if (err) return next(err);
			var usershowid_num = result.value;
			var usershowid_str = padding(usershowid_num);

			Const.update({name: "id"}, {$set:{
				value: (1 + usershowid_num)
			}}, function(err, user) { if (err) return next(err); }
			);

			User.update({username: username}, {$set:{
					fullname: req.body.fullname,
					school: req.body.school,
					address: req.body.address,
					zipcode: req.body.zipcode,
					cellphone: req.body.cellphone,
					gender: req.body.gender,
					title: req.body.title,
					usershowid: usershowid_str
				}},
				function(err, user) { if (err) return next(err); }
			);

			// 生成20位激活码，`crypto`是nodejs内置的包
			crypto.randomBytes(20, function(err, buf) {
				
				var raw_token = user._id + buf.toString('hex');

				var hasher = crypto.createHash('md5');

				hasher.update(raw_token);

				// 保证激活码不会重复
				user.activeToken = hasher.digest('hex');
				
				// 设置过期时间为24小时
				user.activeExpires = Date.now() + 24 * 3600 * 1000;

				// Notice: localhost
				var link = 'http://account.cscm2017.com/active/' + user.activeToken;
				
				var line1 = '系统收到您的注册请求。<br><br>';
				var line2 = '请于一天内点击 <a href="' + link + '">此处</a> 激活您的账户。<br><br>';
				var line3 = '如果链接无法点击，请复制下方链接粘贴到浏览器的地址栏中访问。<br><br>';
				var line4 = link + '<br><br>';
				var line5 = '如不是本人申请请忽略此邮件。';

				// 发送激活邮件
				mailer({
					to: req.body.username,
					subject: 'CSCM 2017 注册验证',
					html: line1 + line2 + line3 + line4 + line5
				});
				// 保存用户对象
				user.save(function(err, user) {
					if(err) return next(err);
					return res.render('message', {
						title: '注册成功',
						msg_title: '注册成功',
						msg_content: '已发送邮件至' + username + '，请在24小时内按照邮件提示激活。',
						msg_return: '/../',
						msg_return_hint: '返回登录页面'
					});
				});
			});
		});
	});
});

router.post('/trygetpassword', function(req, res, next) {
	var username = req.body.email;

	User.findOne({username: username}, function(err, user) {
		if (err || user == null) {
			return res.render('message', {
				title: '密码重设失败',
				msg_title: '密码重设失败',
				msg_content: '用户名不存在',
				msg_return: '/../',
				msg_return_hint: '返回注册页面'
			});
		}
		// 生成20位激活码，`crypto`是nodejs内置的包
		crypto.randomBytes(20, function (err, buf) {
			
			// 保证激活码不会重复 设置过期时间为30分钟
			user.resetpasswd = true;
			user.resetToken = user._id + buf.toString('hex');
			user.resetExpires = Date.now() + 1800 * 1000;

			// Notice: localhost
			var link = 'http://account.cscm2017.com/resetpasswd/' + user.resetToken;
			var line1 = '系统收到您重设密码的请求。<br><br>';
			var line2 = '请在30分钟内点击 <a href="' + link + '">此处</a> 重置您的密码。<br><br>';
			var line3 = '如果链接无法点击，请复制下方链接粘贴到浏览器的地址栏中访问。<br><br>';
			var line4 = link + '<br><br>';
			var line5 = '如不是本人申请请忽略此邮件。';
			  
			// 发送重置密码邮件
			mailer({
				to: username,
				subject: 'CSCM 2017 密码重置请求',
				html: line1 + line2 + line3 + line4 + line5
			});
			// 保存用户对象
			user.save(function(err, user) {
				if(err) return next(err);
				return res.render('message', {
					title: '申请成功',
					msg_title: '申请成功',
					msg_content: '已发送邮件至' + username + '，请在30分钟内按照邮件提示激活。',
					msg_return: '/../',
					msg_return_hint: '返回登录页面'
				});
			});
		});
	});
});

// router.get('/test/', function(req, res, next) {
// 	var u = {'username': 'test', 'goingtoreport': true, 'reporttitle': '23333', 'reportabstract': 'asdf;lkj'};
// 	res.render('asetting', {user: u})
// });

module.exports = router;
