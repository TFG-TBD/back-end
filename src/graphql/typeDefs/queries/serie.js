const { gql } = require('apollo-server');

const serieQueries = gql`
	extend type Query {
		searchSeries(query: String!, page: Int, lang: String): [SerieSearch]
		getSerie(id: String!, lang: String): Serie
		getGenres(lang: String): [Genre]
		discover(genres: [String], lang: String): [SerieSearch]
		trending(time: String!, lang: String): [SerieSearch]
		popular(lang: String): [Serie]
		topRated(lang: String): [Serie]
		airingToday(lang: String): [Serie]
		getCast(id: String!, lang: String): [Person]
		getPersonSeries(id: ID!, lang: String): [Serie]
		getPersonDetails(id: ID!, lang: String): PersonDetails
		getRecomendations(id: String!, lang: String): [Serie]
	}
`;

module.exports = {
	serieQueries,
};
