const { gql } = require('apollo-server');

const reactionType = gql`
	type Reaction {
		id: ID!
		reaction: String!
		user: User!
		date: String!
		comment: ID!
	}
`;

module.exports = {
	reactionType,
};
