const { TMDB_API_KEY } = require('../../utils/config');
const TMDB = require('../../lib/TMDB');
const { populateGenre } = require('../../utils/functions');
const { List } = require('../../models');

const TMDBClient = new TMDB({
	api_key: TMDB_API_KEY,
});

const serieResolvers = {
	Serie: {
		lists: async (root, args, context) => {
			if (context.currentUser) return List.find({ user: context.currentUser._id, series: root.id });
			return [];
		},
	},

	Query: {
		searchSeries: async (root, args) => {
			const data = await TMDBClient.search({
				language: args.lang | 'en-EN',
				page: args.page,
				query: args.query,
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		getSerie: async (root, args) => {
			const data = await TMDBClient.getSerie(args.id, {
				language: args.lang | 'en-EN',
			});

			return data;
		},
		getGenres: async (root, args) => {
			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});

			return genres;
		},
		discover: async (root, args) => {
			const data = await TMDBClient.discover({
				language: args.lang | 'en-EN',
				with_genres: args.genres ? args.genres.map((g) => `${g},`) : '',
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		trending: async (root, args) => {
			const data = await TMDBClient.trending(args.time, {
				language: args.lang | 'en-EN',
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		popular: async (root, args) => {
			const data = await TMDBClient.popular({
				language: args.lang | 'en-EN',
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		topRated: async (root, args) => {
			const data = await TMDBClient.topRated({
				language: args.lang | 'en-EN',
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		airingToday: async (root, args) => {
			const data = await TMDBClient.airingToday({
				language: args.lang | 'en-EN',
			});

			const { genres } = await TMDBClient.getGenres({
				language: args.lang | 'en-EN',
			});
			populateGenre(data, genres);

			return data.results;
		},
		getCast: async (root, args) => {
			const data = await TMDBClient.getCast(args.id, {
				language: args.lang | 'en-EN',
			});

			return data.cast;
		},
		getRecomendations: async (root, args) => {
			const data = await TMDBClient.getRecomendations(args.id, {
				language: args.lang | 'en-EN',
			});

			return data.results;
		},
	},
};

module.exports = {
	serieResolvers,
};
