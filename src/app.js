const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { JWT_SECRET } = require('./utils/config');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./utils/database');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id).populate('userInfo');
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
