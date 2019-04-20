const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
	userId:{type:String},
	action:{type:String},
	content:{type:String},
	time:{type:Number},
	page:{type:String}
});

module.exports = mongoose.model('Actions', ActionsSchema);