const { query } = require('./query');
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
	query,
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
