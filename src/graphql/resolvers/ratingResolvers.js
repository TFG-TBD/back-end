const { Rating, User } = require('../../models');
const { AuthenticationError, UserInputError } = require('apollo-server');

const ratingResolvers = {
	Rating: {
		user: (root) => {
			return User.findById(root.user);
		},
	},

	Query: {
		ratings: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			if (args.serie) return Rating.find({ serie: args.serie, user: context.currentUser._id });
			return Rating.find({ user: context.currentUser._id });
		},
	},

	Mutation: {
		addRating: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const rating = await Rating.findOne({ serie: args.serie, user: context.currentUser._id });
			if (rating) {
				rating.rating = args.rating;
				rating.date = new Date();
				return rating.save().catch((error) => {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				});
			} else {
				const rating = new Rating({ ...args, user: context.currentUser._id, date: new Date() });
				return rating.save().catch((error) => {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				});
			}
		},

		removeRating: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const removed = await Rating.deleteOne({ serie: args.serie, user: context.currentUser._id });
			if (removed.deletedCount) return args.serie;
			else return null;
		},
	},
};

module.exports = {
	ratingResolvers,
};
