const { userQueries } = require('./user');
const { authQueries } = require('./auth');
const { listQueries } = require('./list');
const { platformQueries } = require('./platform');
const { serieQueries } = require('./serie');
const { ratingQueries } = require('./rating');
const { gql } = require('apollo-server-core');

const queries = gql`
	type Query
	type Mutation
`;

module.exports = {
	queries,
	userQueries,
	authQueries,
	listQueries,
	platformQueries,
	serieQueries,
	ratingQueries,
};
