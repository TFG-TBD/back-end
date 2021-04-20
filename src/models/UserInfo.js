const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	surname: {
		type: String,
		required: false,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	confirmed: {
		type: Boolean,
		require: true,
		default: false,
	},
	birthDate: {
		type: Date,
		require: true,
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		require: true,
	},
	city: {
		type: String,
		required: false,
	},
});

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	},
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('UserInfo', schema);
