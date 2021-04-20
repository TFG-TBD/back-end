const { UserInfo } = require('../models');

const userInfoResolvers = {
	Query: {
		userInfo: () => UserInfo.find({}),
	},
};

module.exports = {
	userInfoResolvers,
};
