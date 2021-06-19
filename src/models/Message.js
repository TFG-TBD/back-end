const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	read: {
		type: Boolean,
		required: false,
		default: false,
	},
	sent: {
		type: Boolean,
		required: false,
		default: false,
	},
	reactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reaction',
			required: true,
		},
	],
});

module.exports = mongoose.model('Message', schema);
