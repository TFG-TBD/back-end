const { gql } = require('apollo-server');

const listType = gql`
	type List {
		id: ID!
		name: String!
		description: String
		public: Boolean!
		locked: Boolean!
		icon: String
		series: [Serie!]!
		episodes: [String!]!
	}
`;

module.exports = {
	listType,
};
