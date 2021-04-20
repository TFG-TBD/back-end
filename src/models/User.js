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
	followsCount: {
		type: Number,
		required: false,
		default: 0,
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	followersCount: {
		type: Number,
		required: false,
		default: 0,
	},
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

schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);
