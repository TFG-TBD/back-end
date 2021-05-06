const { gql } = require('apollo-server');

const commentType = gql`
	type Comment {
		id: ID!
		user: User!
		message: String!
		spoiler: Boolean!
		date: String
		reactions: [Reaction]!
	}
`;

module.exports = {
	commentType,
};
