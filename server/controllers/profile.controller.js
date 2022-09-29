const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const { currentUserId } = require("../middlewares/currentUserId");

exports.profileCreateController = async (req, res, next) => {
	try {
		const currentUser = await User.findOne({ userId: req.body?.userId });

		if (currentUser) {
			const newProfile = new Profile(req.body);
			await newProfile.save();

			currentUser.profile = newProfile._id;
			await currentUser.save();

			res.status(201).json({ message: "Profile created successfully", newProfile });
		} else {
			return res.status(403).json({ message: "Unauthorized" });
		}
	} catch (err) {
		next(err);
	}
};

exports.profileViewGetController = async (req, res, next) => {
	const userId = currentUserId(req, res, next);
	if (userId) {
		const userProfile = await User.findOne({ _id: userId })
			.populate("profile")
			.select("primaryName courses userId profile");
		return res.status(200).json({ userProfile, message: "Success" }); // sending profile with basic user information
	}
	return res.status(200).json({ message: "Unauthorized" });
};
