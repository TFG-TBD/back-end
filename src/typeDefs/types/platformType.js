const { gql } = require('apollo-server');

const platformType = gql`
	type Platform {
		name: String!
		url: String!
		premium: Boolean
	}
`;

module.exports = {
	platformType,
};
