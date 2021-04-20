const { gql } = require('apollo-server');

const commentType = gql`
	type Comment {
		user: User!
		message: String!
		spoiler: Boolean!
		date: String
		reactions: [Reaction!]!
	}
`;

module.exports = {
	commentType,
};
