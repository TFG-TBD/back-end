const {
	queries,
	userQueries,
	authQueries,
	listQueries,
	platformQueries,
	serieQueries,
	ratingQueries,
} = require('./queries');

const {
	userInfoType,
	userType,
	platformType,
	listType,
	ratingType,
	conversationType,
	messageType,
	reactionType,
	commentType,
	serieType,
} = require('./types');

const typeDefs = [
	queries,
	userQueries,
	authQueries,
	listQueries,
	platformQueries,
	serieQueries,
	ratingQueries,
	userInfoType,
	platformType,
	listType,
	userType,
	ratingType,
	conversationType,
	messageType,
	reactionType,
	commentType,
	serieType,
];

module.exports = {
	typeDefs,
};
