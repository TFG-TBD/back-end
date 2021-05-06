const {
	queries,
	userQueries,
	authQueries,
	listQueries,
	platformQueries,
	serieQueries,
	ratingQueries,
	commentQueries,
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
	commentQueries,
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
