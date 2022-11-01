const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { verifyUser } = require("../middlewares/verifyUser");
const { loggedInUser } = require("../middlewares/loggedInUser");

exports.loginController = async (req, res, next) => {
	const { userId, password } = req.body;

	try {
		const userData = await User.findOne({ userId }).select(
			"+password _id userId primaryName profile role"
		);
		if (userData) {
			const match = await bcrypt.compare(password, userData.password);
			if (match) {
				const token = jwt.sign(
					{
						user: {
							id: userData._id,
							userId,
							primaryName: userData.primaryName,
							role: userData.role,
						},
					},
					process.env.SECRET_KEY,
					{
						expiresIn: "1h",
					}
				);
				res.cookie("auth", token, {
					httpOnly: true,
					expires: new Date(Date.now() + 3600000),
				});
				const { password, ...restData } = userData._doc;
				return res.status(200).json({
					success: true,
					message: "Login successful",
					userData: restData,
				});
			}
			return res
				.status(200)
				.json({ success: false, isError: true, message: "Wrong credentials." });
		}
		res.status(200).json({ success: false, isError: true, message: "Wrong credentials." });
	} catch (err) {
		next(err);
	}
};

exports.signupController = async (req, res, next) => {
	const { primaryName, userId, password } = req.body;
	const role = /^[0-9]+$/.test(userId) ? "teacher" : "student";

	try {
		const isFound = await User.exists({ userId });
		if (isFound)
			return res
				.status(200)
				.json({ success: false, duplication: true, message: "User Id already in use." });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			primaryName,
			role,
			userId,
			password: hashedPassword,
		});
		// const err = newUser.validateSync();
		// console.log(err?.errors?.["primaryName"]);
		// TODO: learn to maintain the error handling behavior
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

exports.checkIsLoggedInController = async (req, res, next) => {
	const isLoggedIn = verifyUser(req, res, next);
	const user = await loggedInUser(req, res, next);
	if (isLoggedIn) {
		return res.status(200).json({ success: true, user });
	} else {
		res.status(200).json({ success: false });
	}
};

exports.checkPasswordPostController = async (req, res, next) => {
	try {
		const { password } = req.body;
		const user = await loggedInUser(req, res, next);
		const userPassword = await User.findOne({ userId: user.userId }).select("password");
		if (userPassword) {
			const isMatched = await bcrypt.compare(password, userPassword.password);
			return isMatched
				? res.status(200).json({ success: true })
				: res.status(200).json({
						success: false,
						isError: true,
						message: "Password didn't matched!",
				  });
		}
		return res.status(200).json({ success: false, message: "Unauthorized" });
	} catch (err) {
		next(err);
	}
};

exports.changePasswordPostController = async (req, res, next) => {
	try {
		const passwords = req.body;
		const { userId } = await loggedInUser(req, res, next);
		const userPassword = await User.findOne({ userId }).select("password");
		if (passwords[0].password !== passwords[1].password) {
			return res
				.status(200)
				.json({ success: false, isError: true, message: "Password didn't matched!" });
		}
		if (userPassword) {
			const isMatched = await bcrypt.compare(passwords[0].password, userPassword.password);
			if (isMatched)
				return res
					.status(200)
					.json({
						success: false,
						isError: true,
						message: "Old password can't be new password",
					});
		}
		const encryptedPassword = await bcrypt.hash(passwords[0]?.password, 10);
		const updateUser = await User.findOneAndUpdate(
			{ userId },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.status(200).json({ success: true, updateUser, message: "Password changed!" });
	} catch (err) {
		next(err);
	}
};

exports.logoutController = (req, res, next) => {
	const isLoggedIn = verifyUser(req, res, next);
	if (isLoggedIn) {
		res.clearCookie("auth");
		return res.status(200).json({ success: true, message: "Logout successful" });
	}
	res.status(200).json({ success: false, message: "Unauthorized" });
};
