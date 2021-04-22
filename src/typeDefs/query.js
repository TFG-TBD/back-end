const { gql } = require('apollo-server');

const query = gql`
	type Query {
		me: User

		userInfo: UserInfo
		user: User
		platforms: [Platform]
		lists(id: String): [List]

		searchSeries(query: String!, page: Int): [SerieSearch]
		getSerie(id: String!): Serie
		getGenres: [Genre]
	}

	type Mutation {
		register(username: String!, email: String!, password: String!): Token!
		login(username: String, email: String, password: String!): Token!

		addList(name: String!, description: String, public: Boolean, icon: String): List
		deleteList(id: String!): String
		updateList(id: ID!, name: String, description: String, public: Boolean, icon: String): List
		addSeriesToList(id: ID!, serieIds: [String]!): List
		removeSeriesFromList(id: ID!, serieIds: [String]!): List
		addEpisodesToList(id: ID!, episodeIds: [String]!): List
		removeEpisodesFromList(id: ID!, episodeIds: [String]!): List

		addRating(serie: String!, rating: Int!): String
	}
`;

module.exports = {
	query,
};
