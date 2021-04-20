const { gql } = require('apollo-server');

const reactionType = gql`
	type Reaction {
		reaction: String!
		user: User!
		date: String!
	}
`;

module.exports = {
	reactionType,
};
