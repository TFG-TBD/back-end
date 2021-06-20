const { Conversation, User } = require('../../models');
const { AuthenticationError } = require('apollo-server');

const conversationResolvers = {
	Conversation: {
		user1: (root) => {
			return User.findById(root.user1);
		},
		user2: (root) => {
			return User.findById(root.user2);
		},
	},

	Query: {
		conversation: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			if (!args.user) return null;

			const conversation = await Conversation.findOne({
				$or: [
					{ user1: args.user, user2: context.currentUser._id },
					{ user2: args.user, user1: context.currentUser._id },
				],
			}).populate('messages');

			if (!conversation) return null;
			return conversation;
		},

		conversations: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const conversations = await Conversation.find({
				$or: [{ user2: context.currentUser._id }, { user1: context.currentUser._id }],
			}).populate('messages');

			if (!conversations) return null;
			return conversations;
		},
	},
};

module.exports = {
	conversationResolvers,
};
