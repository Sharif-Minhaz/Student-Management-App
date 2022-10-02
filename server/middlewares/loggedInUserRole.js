const jwt = require("jsonwebtoken");

exports.loggedInUserRole = (req, res, next) => {
	try {
		if (req.cookies?.auth) {
			const data = jwt.verify(req.cookies.auth, process.env.SECRET_KEY);
			return data.user?.role;
		}
		return "guest";
	} catch (err) {
		next(err);
	}
};
