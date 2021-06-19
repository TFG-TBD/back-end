const { gql } = require('apollo-server');

const messageQueries = gql`
	extend type Mutation {
		sendMessage(user: ID!, message: String!): Message
	}
	extend type Subscription {
		newMessage: Message
	}
`;

module.exports = {
	messageQueries,
};
