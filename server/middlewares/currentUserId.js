const jwt = require("jsonwebtoken");

exports.currentUserId = (req, res, next) => {
	try {
		if (req.cookies?.auth) {
			const data = jwt.verify(req.cookies.auth, process.env.SECRET_KEY);
			return data.user?.id;
		}
		return false;
	} catch (err) {
		next(err);
	}
};
