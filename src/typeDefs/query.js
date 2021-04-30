const { gql } = require('apollo-server');

const query = gql`
	type Query {
		# USER
		me: User

		# LISTS
		lists(id: String): [List]

		# PLATFORMS
		platforms: [Platform]

		# SERIES
		searchSeries(query: String!, page: Int, lang: String): [SerieSearch]
		getSerie(id: String!, lang: String): Serie
		getGenres(lang: String): [Genre]
		discover(genres: [String], lang: String): [SerieSearch]
		trending(time: String!, lang: String): [SerieSearch]
	}

	type Mutation {
		# AUTH
		register(username: String!, email: String!, password: String!): Token!
		login(username: String, email: String, password: String!): Token!

		# USERINFO
		updateUser(name: String, surname: String, birthDate: String, gender: String, city: String): UserInfo

		# USER
		follow(id: String): String
		unfollow(id: String): String

		# LISTS
		addList(name: String!, description: String, public: Boolean, icon: String): List
		deleteList(id: String!): String
		updateList(id: ID!, name: String, description: String, public: Boolean, icon: String): List
		addSeriesToList(id: ID!, serieIds: [String]!): List
		removeSeriesFromList(id: ID!, serieIds: [String]!): List
		addEpisodesToList(id: ID!, episodeIds: [String]!): List
		removeEpisodesFromList(id: ID!, episodeIds: [String]!): List

		# PLATFORMS
		addPlatform(id: Int!): Platform

		# RATINGS
		addRating(serie: String!, rating: Int!): String
	}
`;

module.exports = {
	query,
};
