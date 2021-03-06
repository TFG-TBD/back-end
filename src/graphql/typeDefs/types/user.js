const { gql } = require('apollo-server');

const userType = gql`
	type User {
		id: ID!
		userInfo: UserInfo
		isFollowed: Boolean
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
		user: User
	}
`;

module.exports = {
	userType,
};
