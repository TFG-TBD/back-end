const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	user2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
			required: true,
		},
	],
});

module.exports = mongoose.model('Conversation', schema);
