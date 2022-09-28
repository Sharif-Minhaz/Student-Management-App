const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.loginController = async (req, res, next) => {
	const { userId, password } = req.body;

	try {
		const userData = await User.findOne({ userId });
		if (userData) {
			const match = await bcrypt.compare(password, userData.password);
			if (match) {
				const token = jwt.sign(
					{ user: { userId, primaryName: userData.primaryName } },
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
					primaryName: userData.primaryName,
					userId: userData.userId,
					courses: userData.courses,
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
	const { primaryName, userId, password } = req.body;
	try {
		const isFound = await User.findOne({ userId });
		if (isFound)
			return res.status(200).json({ success: false, message: "User Id already in use." });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			primaryName,
			userId,
			password: hashedPassword,
		});
		await newUser.save();

		res.status(201).json({
			success: true,
			message: "Signup successful",
			userData: { primaryName, userId },
		});
	} catch (err) {
		next(err);
	}
};