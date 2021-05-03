const { gql } = require('apollo-server');

const userQueries = gql`
	extend type Query {
		me: User
	}

	extend type Mutation {
		# USERINFO
		updateUser(name: String, surname: String, birthDate: String, gender: String, city: String): UserInfo

		# USER
		follow(id: String): String
		unfollow(id: String): String
	}
`;

module.exports = {
	userQueries,
};
