const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	serie: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Rating', schema);
