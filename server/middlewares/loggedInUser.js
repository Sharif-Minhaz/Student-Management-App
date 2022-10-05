const { currentUserId } = require("./currentUserId");
const User = require("../models/User.model");

exports.loggedInUser = async (req, res, next) => {
	const id = currentUserId(req, res, next);
	try {
		const user = await User.findById(id);
		if (user) {
			return user;
		}
		return false;
	} catch (err) {
		next(err);
	}
};
