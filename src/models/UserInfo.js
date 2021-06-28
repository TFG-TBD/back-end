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
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	public: {
		type: Boolean,
		required: false,
		default: true,
	},
	confirmed: {
		type: Boolean,
		required: true,
		default: false,
	},
	admin: {
		type: Boolean,
		required: false,
		default: false,
	},
	birthDate: {
		type: Date,
		required: false,
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		required: false,
	},
	city: {
		type: String,
		required: false,
	},
	img: {
		type: Number,
		required: true,
		default: 1,
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
