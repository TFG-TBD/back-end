const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./utils/database');
const contextMiddleware = require('./utils/contextMiddleware');

const server = new ApolloServer({
	subscriptions: {
		path: '/pubsub',
	},
	typeDefs,
	resolvers,
	context: contextMiddleware,
});

server.listen({ port: process.env.PORT || 80 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
