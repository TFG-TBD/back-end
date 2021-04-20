const { gql } = require('apollo-server');

const messageType = gql`
	type Message {
		message: String!
		type: String!
		date: String!
		read: Boolean!
		sent: Boolean!
		reactions: [Reaction]!
	}
`;

module.exports = {
	messageType,
};
