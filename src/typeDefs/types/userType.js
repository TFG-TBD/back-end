const { gql } = require('apollo-server');

const userType = gql`
	type User {
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
`;

module.exports = {
	userType,
};
