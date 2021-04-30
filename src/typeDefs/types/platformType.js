const { gql } = require('apollo-server');

const platformType = gql`
	type Platform {
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
