const { User } = require('../../models');

const reactionResolvers = {
	Reaction: {
		user: (root) => {
			return User.findById(root.user);
		},
	},
};

module.exports = {
	reactionResolvers,
};
