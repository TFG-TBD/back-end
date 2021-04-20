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
	date: {
		type: Date,
		required: true,
	},
	read: {
		type: Boolean,
		require: false,
	},
	sent: {
		type: Boolean,
		require: false,
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
