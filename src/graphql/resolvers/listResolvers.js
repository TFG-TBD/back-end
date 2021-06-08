const { TMDB_API_KEY } = require('../../utils/config');
const TMDB = require('../../lib/TMDB');
const { List } = require('../../models');
const { UserInputError, AuthenticationError } = require('apollo-server');

const TMDBClient = new TMDB({
	api_key: TMDB_API_KEY,
});

const listResolvers = {
	List: {
		series: async (root, args) => {
			if (root.series.length) {
				const promises = [];

				root.series.forEach((id) => {
					promises.push(
						TMDBClient.getSerie(id, {
							language: args.lang | 'en-EN',
						})
					);
				});

				return await Promise.all(promises);
			}
			return [];
		},
	},

	Query: {
		lists: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			if (args.id) {
				const lists = await List.find({ _id: args.id, user: context.currentUser._id });
				return lists;
			}

			return List.find({ user: context.currentUser._id });
		},
	},

	Mutation: {
		addList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const list = new List({ ...args, user: context.currentUser._id });
			return list.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		deleteList: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const deleted = await List.deleteOne({ _id: args.id, user: context.currentUser._id });
			if (!deleted.deletedCount) return null;

			return args.id;
		},

		updateList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return List.findOneAndUpdate(
				{ _id: args.id, user: context.currentUser._id },
				{ ...args },
				{ useFindAndModify: false, new: true }
			);
		},

		addSeriesToList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return List.findOneAndUpdate(
				{ _id: args.id, user: context.currentUser._id },
				{
					$addToSet: {
						series: { $each: args.serieIds },
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		removeSeriesFromList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return List.findOneAndUpdate(
				{ _id: args.id, user: context.currentUser._id },
				{
					$pullAll: {
						series: args.serieIds,
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		addEpisodesToList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return List.findOneAndUpdate(
				{ _id: args.id, user: context.currentUser._id },
				{
					$addToSet: {
						episodes: { $each: args.episodeIds },
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		removeEpisodesFromList: (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			return List.findOneAndUpdate(
				{ _id: args.id, user: context.currentUser._id },
				{
					$pullAll: {
						episodes: args.episodeIds,
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},
	},
};

module.exports = {
	listResolvers,
};
