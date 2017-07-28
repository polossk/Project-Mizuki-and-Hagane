var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConstSchema = new Schema({
	name: { type: String, index: { unique: true } },
	value: Number
});

module.exports = mongoose.model('constant', ConstSchema);