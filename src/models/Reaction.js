const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	reaction: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Reaction', schema);
