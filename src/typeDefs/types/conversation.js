const { gql } = require('apollo-server');

const conversationType = gql`
	type Conversation {
		user1: User!
		user2: User!
		messages: [Message!]!
	}
`;

module.exports = {
	conversationType,
};
