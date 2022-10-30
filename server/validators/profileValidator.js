exports.profileValidator = (req, res, next) => {
	const { fullName, email, userId } = req.body;

	const error = {};
	error.userId = userId ? "" : "student/teacher id is required";
	error.fullName = fullName ? "" : "full name is required";
	error.email = email ? "" : "email address is required";

	if (error.userId || error.fullName || error.email) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
