const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	userId:{type:String},
	userName:{type:String}
});

module.exports = mongoose.model('Users', UsersSchema);