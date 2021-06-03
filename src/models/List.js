const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	description: {
		type: String,
		required: false,
	},
	public: {
		type: Boolean,
		required: true,
		default: false,
	},
	locked: {
		type: Boolean,
		required: true,
		default: false,
	},
	icon: {
		type: String,
		required: false,
	},
	series: {
		type: [String],
		required: true,
	},
	episodes: {
		type: [String],
		required: true,
	},
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('List', schema);
