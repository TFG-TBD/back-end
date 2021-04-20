const { gql } = require('apollo-server');

const query = gql`
	type Query {
		userInfo: UserInfo
		user: User
		platforms: [Platform]
		lists(id: String): [List]
	}

	type Mutation {
		addList(name: String!, description: String, public: Boolean!, icon: String): List
		deleteList(id: String!): String
		updateList(id: ID!, name: String, description: String, public: Boolean, icon: String): List
		addSeriesToList(id: ID!, serieIds: [String]!): List!
		removeSeriesFromList(id: ID!, serieIds: [String]!): List!
		addEpisodesToList(id: ID!, episodeIds: [String]!): List!
		removeEpisodesFromList(id: ID!, episodeIds: [String]!): List!
	}
`;

module.exports = {
	query,
};
