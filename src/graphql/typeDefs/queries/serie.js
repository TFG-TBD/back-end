const { gql } = require('apollo-server');

const serieQueries = gql`
	extend type Query {
		searchSeries(query: String!, page: Int, lang: String): [SerieSearch]
		getSerie(id: String!, lang: String): Serie
		getGenres(lang: String): [Genre]
		discover(genres: [String], lang: String): [SerieSearch]
		trending(time: String!, lang: String): [SerieSearch]
	}
`;

module.exports = {
	serieQueries,
};
