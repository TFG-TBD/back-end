const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	spoiler: {
		type: Boolean,
		required: true,
		default: false,
	},
	date: {
		type: Date,
		required: true,
	},
	reactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reaction',
			required: true,
		},
	],
});

module.exports = mongoose.model('Comment', schema);
