const { gql } = require('apollo-server');

const authQueries = gql`
	extend type Mutation {
		register(username: String!, email: String!, password: String!): Token!
		login(username: String, email: String, password: String!): Token!
	}
`;

module.exports = {
	authQueries,
};
