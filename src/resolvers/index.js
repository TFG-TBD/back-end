const { userInfoResolvers } = require('./userInfoResolvers');
const { platformResolvers } = require('./platformResolvers');
const { listResolvers } = require('./listResolvers');
const { userResolvers } = require('./userResolvers');

const resolvers = [userInfoResolvers, platformResolvers, listResolvers, userResolvers];

module.exports = {
	resolvers,
};
