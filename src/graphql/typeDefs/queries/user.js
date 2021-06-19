const { gql } = require('apollo-server');

const userQueries = gql`
	extend type Query {
		me: User

		# SEARCH
		searchUsers(query: String!, page: Int): [User]!

		# USER
		getUser(id: ID!): User

		# FOLLOWERS
		getFollowers(id: ID): [User]
		getFollows(id: ID): [User]
	}

	extend type Mutation {
		# USERINFO
		updateUser(
			name: String
			surname: String
			birthDate: String
			gender: String
			city: String
			public: Boolean
		): UserInfo

		# USER
		follow(id: ID!): User
		unfollow(id: ID!): User
	}
`;

module.exports = {
	userQueries,
};
