exports.checkPasswordValidator = (req, res, next) => {
	const { password } = req.body;

	const error = {};
	error.password = password ? "" : "Old password is required";

	if (error.password) {
		return res.status(200).json({ success: false, error });
	} else {
		next();
	}
};
