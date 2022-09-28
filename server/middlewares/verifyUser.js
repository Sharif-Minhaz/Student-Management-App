const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
	try {
		if (req.cookies?.auth) {
			return jwt.verify(req.cookies.auth, process.env.SECRET_KEY);
		}
		return false;
	} catch (err) {
		next(err);
	}
};
