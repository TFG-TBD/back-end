const { gql } = require('apollo-server');

const userInfoType = gql`
	type UserInfo {
		name: String
		surname: String
		username: String!
		email: String!
		confirmed: String!
		birthDate: String!
		gender: String
		city: String
	}
`;

module.exports = {
	userInfoType,
};
