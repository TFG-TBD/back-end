const { gql } = require('apollo-server');

const userInfoType = gql`
	type UserInfo {
		id: ID!
		name: String
		surname: String
		username: String!
		email: String!
		public: Boolean
		confirmed: String!
		admin: Boolean
		birthDate: String
		gender: String
		city: String
		img: Int
	}
`;

module.exports = {
	userInfoType,
};
