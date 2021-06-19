const { gql } = require('apollo-server');

const messageType = gql`
	type Message {
		id: ID!
		message: String!
		type: String!
		to: User!
		from: User!
		date: String!
		read: Boolean!
		sent: Boolean!
		reactions: [Reaction]!
	}
`;

module.exports = {
	messageType,
};
