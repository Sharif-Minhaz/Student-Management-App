exports.getHomeController = (req, res, next) => {
	res.status(200).json({
		message: "Welcome to home page",
	});
};
