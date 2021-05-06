const { gql } = require('apollo-server');

const ratingQueries = gql`
	extend type Query {
		ratings(serie: String): [Rating!]!
	}

	extend type Mutation {
		addRating(serie: String!, rating: Int!): Rating
		removeRating(serie: String!): String
	}
`;

module.exports = {
	ratingQueries,
};
