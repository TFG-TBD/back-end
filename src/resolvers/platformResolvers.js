const { Platform } = require('../models');

const platformResolvers = {
	Query: {
		platforms: () => Platform.find({}),
	},
};

module.exports = {
	platformResolvers,
};
