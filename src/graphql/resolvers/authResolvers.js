const { User, UserInfo, List } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/config');
const { UserInputError, AuthenticationError } = require('apollo-server');

const authResolvers = {
	Query: {
		me: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return context.currentUser;
		},
	},

	Mutation: {
		login: async (root, args) => {
			if (!args.username && !args.email)
				throw new UserInputError('Invalid username or password', {
					invalidArgs: args,
				});

			const users = await User.aggregate([
				{ $lookup: { from: 'userinfos', localField: 'userInfo', foreignField: '_id', as: 'userInfo' } },
				{ $unwind: '$userInfo' },
				{ $match: { $or: [{ 'userInfo.username': args.username }, { 'userInfo.email': args.email }] } },
			]);

			if (!users.length)
				throw new UserInputError('Invalid username or password', {
					invalidArgs: args,
				});

			const user = users[0];
			const passwordCorrect = user === null ? false : await bcrypt.compare(args.password, user.userInfo.password);

			if (!passwordCorrect)
				throw new UserInputError('Invalid username or password', {
					invalidArgs: args,
				});

			const userForToken = {
				id: user._id,
				username: user.userInfo.username,
				email: user.userInfo.email,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' }), expiresIn: '7d', user: user };
		},
		register: async (root, args) => {
			const userInfo = new UserInfo({ username: args.username, email: args.email });

			const saltRounds = 10;
			userInfo.password = await bcrypt.hash(args.password, saltRounds);
			const userInfoSaved = await userInfo.save();

			const user = new User({
				userInfo: userInfoSaved.id,
				follows: [],
				followers: [],
				platforms: [],
				conversations: [],
				lists: [],
				ratings: [],
			});

			await user.save();

			const listSeen = new List({
				name: 'Seen',
				user: user._id,
				description: 'Seen series or episodes',
				public: false,
				locked: true,
				series: [],
				episodes: [],
				icon: '2',
			});

			const listLiked = new List({
				name: 'Liked',
				user: user._id,
				description: 'Liked series or episodes',
				public: false,
				locked: true,
				series: [],
				episodes: [],
				icon: '3',
			});

			await listSeen.save();
			await listLiked.save();

			const userForToken = {
				id: user._id,
				username: userInfoSaved.username,
				email: userInfoSaved.email,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' }), expiresIn: '7d' };
		},
	},
};

module.exports = {
	authResolvers,
};
