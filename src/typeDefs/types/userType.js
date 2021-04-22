const { gql } = require('apollo-server');

const userType = gql`
	type User {
		id: ID!
		userInfo: UserInfo
		follows: [User]!
		followsCount: Int!
		followers: [User]!
		followersCount: Int!
		platforms: [Platform]!
		conversations: [Conversation]!
		lists: [List]!
		ratings: [Rating]!
	}

	type Token {
		value: String!
		expiresIn: String!
	}
`;

module.exports = {
	userType,
};
