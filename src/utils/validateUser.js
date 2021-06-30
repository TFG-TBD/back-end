const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/User');

const validateToken = async (token) => {
	const decodedToken = jwt.verify(token.substring(7), JWT_SECRET);
	const currentUser = await User.findById(decodedToken.id);
	return { currentUser };
};

module.exports = { validateToken };
