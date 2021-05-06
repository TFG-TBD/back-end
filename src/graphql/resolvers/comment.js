const { Comment, User, Reaction } = require('../../models');
const { UserInputError, AuthenticationError } = require('apollo-server');

const commentResolvers = {
	Comment: {
		user: (root) => {
			return User.findById(root.user);
		},
		reactions: async (root) => {
			return (await root.populate('reactions').execPopulate()).reactions;
		},
	},

	Query: {
		comments: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			if (args.serie) return Comment.find({ serie: args.serie, user: context.currentUser._id });
			return Comment.find({ user: context.currentUser._id });
		},
	},
	Mutation: {
		addComment: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const comment = new Comment({ ...args, user: context.currentUser._id, date: new Date() });
			return comment.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},
		removeComment: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const removed = await Comment.deleteOne({ _id: args.id, user: context.currentUser._id });
			await Reaction.deleteMany({ comment: args.id });

			if (removed.deletedCount) return args.id;
			else return null;
		},
		addReaction: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const exists = await Reaction.findOne({
				reaction: args.reaction,
				user: context.currentUser._id,
				comment: args.comment,
			});

			if (exists) return null;

			const reaction = new Reaction({
				reaction: args.reaction,
				user: context.currentUser._id,
				date: new Date(),
				comment: args.id,
			});
			const reactionSaved = await reaction.save();

			return Comment.findOneAndUpdate(
				{ _id: args.id },
				{
					$addToSet: {
						reactions: reactionSaved._id,
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},
		removeReaction: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const removed = await Reaction.deleteMany({
				reaction: args.reaction,
				comment: args.id,
				user: context.currentUser._id,
			});
			if (removed.deletedCount) return args.id;
			else return null;
		},
	},
};

module.exports = {
	commentResolvers,
};
