const { gql } = require('apollo-server');

const conversationQueries = gql`
	extend type Query {
		conversation(user: ID!): Conversation
		conversations: [Conversation!]!
	}
`;

module.exports = {
	conversationQueries,
};
