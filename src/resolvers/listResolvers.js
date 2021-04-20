const { List } = require('../models');
const { UserInputError } = require('apollo-server');

const listResolvers = {
	Query: {
		lists: (root, args) => {
			// TODO Authorization

			if (args.id) {
				return List.find({ _id: args.id });
			}
			return List.find({});
		},
	},

	Mutation: {
		addList: (root, args) => {
			// TODO Authorization

			const list = new List({ ...args });
			return list.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},

		deleteList: async (root, args) => {
			// TODO Authorization

			await List.deleteOne({ _id: args.id });
			return args.id;
		},

		updateList: (root, args) => {
			return List.findByIdAndUpdate({ _id: args.id }, { ...args }, { useFindAndModify: false, new: true });
		},

		addSeriesToList: (root, args) => {
			// TODO Authorization

			return List.findByIdAndUpdate(
				{ _id: args.id },
				{
					$addToSet: {
						series: { $each: args.serieIds },
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		removeSeriesFromList: (root, args) => {
			// TODO Authorization

			return List.findByIdAndUpdate(
				{ _id: args.id },
				{
					$pullAll: {
						series: args.serieIds,
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		addEpisodesToList: (root, args) => {
			// TODO Authorization

			return List.findByIdAndUpdate(
				{ _id: args.id },
				{
					$addToSet: {
						episodes: { $each: args.episodeIds },
					},
				},
				{ useFindAndModify: false, new: true }
			);
		},

		removeEpisodesFromList: (root, args) => {
			// TODO Authorization

			return List.findByIdAndUpdate(
				{ _id: args.id },
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
