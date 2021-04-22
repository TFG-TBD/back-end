const { TMDB_API_KEY } = require('../utils/config');
const TMDB = require('../lib/TMDB');

const TMDBClient = new TMDB({
	api_key: TMDB_API_KEY,
});

const serieResolvers = {
	Query: {
		searchSeries: async (root, args) => {
			const data = await TMDBClient.search({
				language: 'es-ES',
				page: args.page,
				query: args.query,
			});

			const { genres } = await TMDBClient.getGenres({
				language: 'es-ES',
			});

			data.results.forEach((serie) => {
				serie.genres = [];
				serie.genre_ids.forEach((gen) => {
					const genre = genres.find((g) => g.id === gen);
					if (genre) serie.genres.push(genres.find((g) => g.id === gen));
				});
			});

			return data.results;
		},
		getSerie: async (root, args) => {
			const data = await TMDBClient.getSerie(args.id, {
				language: 'es-ES',
			});

			return data;
		},
		getGenres: async () => {
			const { genres } = await TMDBClient.getGenres({
				language: 'es-ES',
			});

			return genres;
		},
	},
};

module.exports = {
	serieResolvers,
};
