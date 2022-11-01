exports.changePasswordValidator = (req, res, next) => {
	const passwords = req.body;
	const error = {};
	error.newPassword = passwords[0]?.password ? "" : "New password is required";
	error.confirmPassword = passwords[1]?.password ? "" : "Confirm password is required";

	if (error.newPassword || error.confirmPassword) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
