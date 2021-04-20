const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	premium: {
		type: Boolean,
		required: false,
	},
});

module.exports = mongoose.model('Platform', schema);
