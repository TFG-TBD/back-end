const {
	queries,
	userQueries,
	authQueries,
	listQueries,
	platformQueries,
	serieQueries,
	ratingQueries,
	commentQueries,
	conversationQueries,
	messageQueries,
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
	conversationQueries,
	messageQueries,
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
