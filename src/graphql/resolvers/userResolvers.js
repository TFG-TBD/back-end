const { User, UserInfo } = require('../../models');
const { AuthenticationError } = require('apollo-server');

const userResolvers = {
	User: {
		userInfo: async (root) => {
			return UserInfo.findById(root.userInfo);
		},
	},

	Query: {},

	Mutation: {
		follow: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const followedUser = await User.findOneAndUpdate(
				{ _id: args.id },
				{
					$addToSet: {
						followers: context.currentUser.id,
					},
					$inc: {
						followersCount: 1,
					},
				},
				{ useFindAndModify: false, new: true }
			);

			if (!followedUser) return null;

			const user = await User.findOneAndUpdate(
				{ _id: context.currentUser.id },
				{
					$addToSet: {
						follows: followedUser.id,
					},
					$inc: {
						followsCount: 1,
					},
				},
				{ useFindAndModify: false, new: true }
			);

			return user.id;
		},

		unfollow: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const followedUser = await User.findOneAndUpdate(
				{ _id: args.id },
				{
					$pullAll: {
						followers: [context.currentUser.id],
					},
					$inc: {
						followersCount: -1,
					},
					$max: {
						followersCount: 0,
					},
				},
				{ useFindAndModify: false, new: true }
			);

			if (!followedUser) return null;

			const user = await User.findOneAndUpdate(
				{ _id: context.currentUser.id },
				{
					$pullAll: {
						follows: [followedUser.id],
					},
					$inc: {
						followsCount: -1,
					},
					$max: {
						followersCount: 0,
					},
				},
				{ useFindAndModify: false, new: true }
			);

			return user.id;
		},
	},
};

module.exports = {
	userResolvers,
};
