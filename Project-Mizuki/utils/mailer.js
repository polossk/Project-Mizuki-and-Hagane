// utils/mailer.js
var _ = require('lodash');	
var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
	host: 'smtp.qq.com',
	port: 25,
	auth: {
		user: 'web@cscm2017.com',
		pass: 'clwtfdxnmvdrbjji'
	}
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 创建一个邮件对象
var defaultMail = {
	// 发件人
	from: 'CSCM 2017 Web Admin <web@cscm2017.com>',
	// 邮件内容，HTML格式
	text: 'test html mail'
	// 主题
	// subject: 'test',
	// 收件人
	// to: 'polossk@126.com',
};

module.exports = function(mail) {
	// 应用默认配置
	mail = _.merge({}, defaultMail, mail);
	
	// 发送邮件
	transporter.sendMail(mail, function(error, info) {
		if (error) return console.log(error);
		console.log('mail sent:', info.response);
	});
};