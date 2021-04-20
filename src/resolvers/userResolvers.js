const { User } = require('../models');

const userResolvers = {
	Query: {
		user: () => User.find({}),
	},
};

module.exports = {
	userResolvers,
};
