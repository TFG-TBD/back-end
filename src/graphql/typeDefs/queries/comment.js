const { gql } = require('apollo-server');

const commentQueries = gql`
	extend type Query {
		comments(serie: String): [Comment]
	}
	extend type Mutation {
		addComment(serie: String!, message: String!, spoiler: Boolean): Comment
		removeComment(id: String!): String
		addReaction(id: String!, reaction: String!): Comment
		removeReaction(id: String!, reaction: String!): String
	}
`;

module.exports = {
	commentQueries,
};
