exports.signupValidator = (req, res, next) => {
	const { primaryName, userId, password } = req.body;

	const error = {};
	error.primaryName = primaryName ? "" : "username is required";
	error.userId = userId ? "" : "student/teacher id is required";
	error.password = password ? "" : "password is required";

	if (error.primaryName || error.userId || error.password) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
