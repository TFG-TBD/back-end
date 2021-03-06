const { gql } = require('apollo-server');

const platformQueries = gql`
	extend type Query {
		platforms: [Platform]
		getTMDBPlatform(id: Int!): Platform
	}

	extend type Mutation {
		addPlatform(id: Int!): Platform
	}
`;

module.exports = {
	platformQueries,
};
