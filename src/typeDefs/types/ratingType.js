const { gql } = require('apollo-server');

const ratingType = gql`
	type Rating {
		user: User!
		rating: Int!
		date: String!
		serie: String!
	}
`;

module.exports = {
	ratingType,
};
