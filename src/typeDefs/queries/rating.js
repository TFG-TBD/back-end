const { gql } = require('apollo-server');

const ratingQueries = gql`
	extend type Mutation {
		addRating(serie: String!, rating: Int!): String
	}
`;

module.exports = {
	ratingQueries,
};
