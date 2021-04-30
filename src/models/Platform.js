const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	tmdb_id: {
		type: Number,
		require: true,
		unique: true,
	},
	logo_path: {
		type: String,
		require: true,
	},
	url: {
		type: String,
		required: true,
	},
	premium: {
		type: Boolean,
		required: false,
		default: false,
	},
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Platform', schema);
