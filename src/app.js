const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./utils/database');
const contextMiddleware = require('./utils/contextMiddleware');
const { validateToken } = require('./utils/validateUser');

const server = new ApolloServer({
	subscriptions: {
		path: '/pubsub',
		onConnect: async (connectionParams) => {
			if (connectionParams.Authorization && connectionParams.Authorization !== null)
				return validateToken(connectionParams.Authorization);

			throw Error('Wrong Authentication');
		},
	},
	typeDefs,
	resolvers,
	context: contextMiddleware,
});

server.listen({ port: process.env.PORT || 80 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
