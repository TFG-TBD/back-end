const { userInfoResolvers } = require('./userInfoResolvers');
const { platformResolvers } = require('./platformResolvers');
const { listResolvers } = require('./listResolvers');
const { userResolvers } = require('./userResolvers');
const { serieResolvers } = require('./serieResolvers');
const { authResolvers } = require('./authResolvers');
const { ratingResolvers } = require('./ratingResolvers');
const { commentResolvers } = require('./commentResolvers');
const { reactionResolvers } = require('./reaction');
const { conversationResolvers } = require('./conversationResolvers');
const { messageResolvers } = require('./messageResolvers');

const resolvers = [
	userInfoResolvers,
	platformResolvers,
	listResolvers,
	userResolvers,
	serieResolvers,
	authResolvers,
	ratingResolvers,
	commentResolvers,
	reactionResolvers,
	conversationResolvers,
	messageResolvers,
];

module.exports = {
	resolvers,
};
