const { userInfoResolvers } = require('./userInfoResolvers');
const { platformResolvers } = require('./platformResolvers');
const { listResolvers } = require('./listResolvers');
const { userResolvers } = require('./userResolvers');
const { serieResolvers } = require('./serieResolvers');
const { authResolvers } = require('./authResolvers');
const { ratingResolvers } = require('./rating');
const { commentResolvers } = require('./comment');
const { reactionResolvers } = require('./reaction');

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
];

module.exports = {
	resolvers,
};
