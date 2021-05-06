const { gql } = require('apollo-server');

const ratingType = gql`
	type Rating {
		id: ID!
		user: User
		rating: Int!
		date: String!
		serie: String!
	}
`;

module.exports = {
	ratingType,
};
