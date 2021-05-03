const { User, UserInfo } = require('../../models');
const { AuthenticationError } = require('apollo-server');

const userInfoResolvers = {
	Query: {},
	Mutation: {
		updateUser: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const user = await User.findById(context.currentUser.id);
			return UserInfo.findByIdAndUpdate(user.userInfo, { ...args }, { useFindAndModify: false, new: true });
		},
	},
};

module.exports = {
	userInfoResolvers,
};
