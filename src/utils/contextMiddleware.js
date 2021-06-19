const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { PubSub } = require('apollo-server');
const User = require('../models/User');

const pubsub = new PubSub();

module.exports = async (context) => {
	let auth;

	if (context.connection && context.connection.context.Authorization) auth = context.connection.context.Authorization;
	if (context.req && context.req.headers.authorization) auth = context.req.headers.authorization;

	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		try {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id);
			context.currentUser = currentUser;
		} catch (err) {
			return null;
		}
	}

	context.pubsub = pubsub;
	return context;
};
