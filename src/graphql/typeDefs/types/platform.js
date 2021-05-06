const { gql } = require('apollo-server');

const platformType = gql`
	type Platform {
		id: ID!
		tmdb_id: Int!
		name: String!
		url: String!
		logo_path: String!
		premium: Boolean
	}
`;

module.exports = {
	platformType,
};
