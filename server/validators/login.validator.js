exports.loginValidator = (req, res, next) => {
	const { userId, password } = req.body;

	const error = {};
	error.userId = userId ? "" : "student/teacher id is required";
	error.password = password ? "" : "password is required";

	if (error.userId || error.password) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
