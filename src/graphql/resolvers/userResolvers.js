const { User, UserInfo, List } = require('../../models');
const { AuthenticationError } = require('apollo-server');

const userResolvers = {
	User: {
		userInfo: async (root) => {
			return UserInfo.findById(root.userInfo);
		},

		lists: async (root) => {
			return List.find({ user: root.id, public: true, locked: false });
		},

		followsCount: (root) => {
			return root.follows.length;
		},

		followersCount: (root) => {
			return root.followers.length;
		},
	},

	Query: {
		searchUsers: async (root, args, context) => {
			const regex = new RegExp(`${args.query}`, 'ig');

			const users = await User.aggregate([
				{ $lookup: { from: 'userinfos', localField: 'userInfo', foreignField: '_id', as: 'userInfo' } },
				{ $unwind: '$userInfo' },
				{ $match: { 'userInfo.username': regex, 'userInfo.public': true } },
			]);

			const ret = users.map((u) => {
				const user = new User(u);
				if (context.currentUser) user.isFollowed = user.followers.includes(context.currentUser.id);
				return user;
			});

			return ret;
		},

		getUser: async (root, args, context) => {
			const user = await User.findById(args.id).populate('userInfo');

			if (user && user.userInfo.public) {
				if (context.currentUser) user.isFollowed = user.followers.includes(context.currentUser.id);

				return user;
			}

			return null;
		},

		getFollowers: async (root, args, context) => {
			if (!args.id) {
				if (context.currentUser) {
					const user = await User.findById(context.currentUser.id).populate('followers');

					return user.followers;
				}
			} else {
				const user = await User.findById(args.id).populate('followers');
				return user.followers;
			}

			return null;
		},

		getFollows: async (root, args, context) => {
			if (!args.id) {
				if (context.currentUser) {
					const user = await User.findById(context.currentUser.id).populate('follows');
					return user.follows;
				}
			} else {
				const user = await User.findById(args.id).populate('follows');
				return user.follows;
			}

			return null;
		},
	},

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
				},
				{ useFindAndModify: false, new: true }
			);

			return user;
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
				},
				{ useFindAndModify: false, new: true }
			);

			return user;
		},
	},
};

module.exports = {
	userResolvers,
};
