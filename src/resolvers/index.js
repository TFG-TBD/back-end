const { userInfoResolvers } = require('./userInfoResolvers');
const { platformResolvers } = require('./platformResolvers');
const { listResolvers } = require('./listResolvers');
const { userResolvers } = require('./userResolvers');
const { serieResolvers } = require('./serieResolvers');

const resolvers = [userInfoResolvers, platformResolvers, listResolvers, userResolvers, serieResolvers];

module.exports = {
	resolvers,
};
