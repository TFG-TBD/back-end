const { User, Conversation, Message } = require('../../models');
const { AuthenticationError, withFilter } = require('apollo-server');

const messageResolvers = {
	Message: {
		to: (root) => {
			return User.findById(root.to);
		},
		from: (root) => {
			return User.findById(root.from);
		},
	},

	Mutation: {
		sendMessage: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const message = new Message({
				message: args.message,
				to: args.user,
				from: context.currentUser._id,
				date: new Date(),
				type: 'text',
			});
			const messageSaved = await message.save();

			const conversation = await Conversation.findOneAndUpdate(
				{
					$or: [
						{ user1: args.user, user2: context.currentUser._id },
						{ user2: args.user, user1: context.currentUser._id },
					],
				},
				{
					$addToSet: {
						messages: messageSaved._id,
					},
				},
				{ useFindAndModify: false, new: true }
			);

			context.pubsub.publish(['NEW_MESSAGE'], {
				newMessage: {
					id: messageSaved._id,
					message: messageSaved.message,
					type: messageSaved.type,
					date: messageSaved.date,
					read: messageSaved.read,
					sent: messageSaved.sent,
					to: args.user,
					from: context.currentUser._id,
				},
			});

			if (!conversation) {
				const newConversation = new Conversation({
					user1: context.currentUser._id,
					user2: args.user,
					messages: [messageSaved._id],
				});
				await newConversation.save();
			}

			return message;
		},
	},

	Subscription: {
		newMessage: {
			subscribe: withFilter(
				(_, __, context) => {
					if (!context || !context.connection.context.currentUser)
						throw new AuthenticationError('Unauthorized', {});

					return context.pubsub.asyncIterator(['NEW_MESSAGE']);
				},
				(root, _, context) => {
					if (root.newMessage.to.toString() === context.connection.context.currentUser._id.toString())
						return true;
					return false;
				}
			),
		},
	},
};

module.exports = {
	messageResolvers,
};
