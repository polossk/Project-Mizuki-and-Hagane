var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String, index: { unique: true } },
	usershowid: String,
	password: String,
	fullname: String,
	school: String,
	address: String, 
	zipcode: String,
	cellphone: String,
	gender: String,
	title: String,
	goingtoreport: { type: Boolean, default: false },
	goingtohotel: { type: Boolean, default: false },
	paid: { type: Boolean, default: false },
	paidconfirm: { type: Boolean, default: false },
	reporttitle: { type: String, default: '' },
	reportauthor: { type: String, default: '' },
	reportabstract: { type: String, default: '' },
	paidtitle: { type: String, default: '' },
	paidtitlenumber: { type: String, default: '' },
	hotelroom: { type: String, default: '' },
	hoteltime0mm: { type: String, default: '' },
	hoteltime0dd: { type: String, default: '' },
	hoteltime1mm: { type: String, default: '' },
	hoteltime1dd: { type: String, default: '' },
	active: { type: Boolean, default: false },
	activeToken: String,
	activeExpires: Date,
	resetpasswd: { type: Boolean, default: false },
	resetToken: String,
	resetExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);