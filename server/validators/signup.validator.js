exports.signupValidator = (req, res, next) => {
	const { primaryName, userId, password } = req.body;

	const error = {};
	const isInValidId = /([^0-9-])/g.test(userId);

	error.primaryName = primaryName ? "" : "username is required";
	if (isInValidId) {
		error.userId = isInValidId ? "Invalid student/teacher id" : "";
	} else {
		error.userId = userId ? "" : "student/teacher id is required";
	}
	error.password = password ? "" : "password is required";

	if (error.primaryName || error.userId || error.password) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
