const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
	userInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserInfo',
		required: true,
		unique: true,
	},
	follows: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	platforms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Platform',
			required: true,
		},
	],
	conversations: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
			required: true,
		},
	],
	lists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'List',
			required: true,
		},
	],
	ratings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
			required: true,
		},
	],
});

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);
