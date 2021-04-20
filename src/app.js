const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const mongoose = require('./utils/database');

// const { MONGODB_URI, JWT_SECRET } = require('./utils/config');
// const jwt = require('jsonwebtoken');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// context: async ({ req }) => {
	// 	const auth = req ? req.headers.authorization : null;
	// 	if (auth && auth.toLowerCase().startsWith('bearer ')) {
	// 		const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
	// 		const currentUser = await User.findById(decodedToken.id);
	// 		return { currentUser };
	// 	}
	// },
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
