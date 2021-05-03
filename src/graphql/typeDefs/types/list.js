const { gql } = require('apollo-server');

const listType = gql`
	type List {
		id: ID!
		name: String!
		description: String
		public: Boolean!
		icon: String
		series: [String!]!
		episodes: [String!]!
	}
`;

module.exports = {
	listType,
};
