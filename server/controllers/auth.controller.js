const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { verifyUser } = require("../middlewares/verifyUser");

exports.loginController = async (req, res, next) => {
	const { userId, password } = req.body;

	try {
		const userData = await User.findOne({ userId });
		if (userData) {
			const match = await bcrypt.compare(password, userData.password);
			if (match) {
				const token = jwt.sign(
					{ user: { id: userData._id, userId, primaryName: userData.primaryName } },
					process.env.SECRET_KEY,
					{
						expiresIn: "1h",
					}
				);
				res.cookie("auth", token, {
					httpOnly: true,
					expires: new Date(Date.now() + 3600000),
				});
			} else {
				return res.status(404).json({ success: false, message: "Wrong credentials." });
			}
			res.status(200).json({
				success: true,
				message: "Login successful",
				userData: {
					id: userData._id,
					primaryName: userData.primaryName,
					userId: userData.userId,
					courses: userData.courses,
					profile: userData.profile,
				},
			});
		} else {
			res.status(404).json({ success: false, message: "Wrong credentials." });
		}
	} catch (err) {
		next(err);
	}
};

exports.signupController = async (req, res, next) => {
	const { primaryName, userId, password, role } = req.body;
	try {
		const isFound = await User.exists({ userId });
		if (isFound)
			return res.status(200).json({ success: false, message: "User Id already in use." });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			primaryName,
			role,
			userId,
			password: hashedPassword,
		});
		const err = newUser.validateSync();
		console.log(err?.errors?.["primaryName"]);
		await newUser.save();

		res.status(201).json({
			success: true,
			message: "Signup successful",
			userData: { primaryName, userId, role },
		});
	} catch (err) {
		next(err);
	}
};

exports.logoutController = (req, res, next) => {
	const isLoggedIn = verifyUser(req, res, next);
	if (isLoggedIn) {
		res.clearCookie("auth");
		return res.status(200).json({ message: "Logout successful" });
	}
	res.status(200).json({ message: "Unauthorized" });
};
