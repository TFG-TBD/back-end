const { Platform } = require('../../models');
const { AuthenticationError } = require('apollo-server');
const { TMDB_API_KEY } = require('../../utils/config');
const TMDB = require('../../lib/TMDB');

const TMDBClient = new TMDB({
	api_key: TMDB_API_KEY,
});

const platformResolvers = {
	Query: {
		platforms: () => Platform.find({}),
	},

	Mutation: {
		addPlatform: async (root, args, context) => {
			if (!context.currentUser || !context.currentUser.userInfo.admin)
				throw new AuthenticationError('Unauthorized', {
					invalidArgs: args,
				});

			const data = await TMDBClient.getNetwork(args.id, {});

			const platform = new Platform({
				name: data.name,
				logo_path: data.logo_path,
				url: data.homepage,
				tmdb_id: data.id,
			});

			return platform.save();
		},
	},
};

module.exports = {
	platformResolvers,
};
