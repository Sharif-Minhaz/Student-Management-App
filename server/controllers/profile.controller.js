const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const { currentUserId } = require("../middlewares/currentUserId");
const cloudinary = require("../utils/cloudinary");

exports.profileCreateController = async (req, res, next) => {
	const defaultProfilePic =
		"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png";
	try {
		const { body } = req;
		const currentUser = await User.findOne({ userId: body.userId });

		let result;
		if (body.profilePicture && body.profilePicture !== defaultProfilePic) {
			result = await cloudinary.uploader.upload(body.profilePicture, {
				folder: "studentManagement",
			});
		}

		if (currentUser) {
			// delete unnecessary properties for teacher
			if (currentUser.role === "teacher") {
				delete body.localGuardianName;
				delete body.localGuardianEmail;
				delete body.localGuardianMobile;
			}

			const profileInfo = result
				? {
						...body,
						profilePicture: result.secure_url || "",
						profilePicCloudinaryId: result.public_id || "",
				  }
				: { ...body };

			// appending cloudinary key with uploaded image url
			const newProfile = new Profile(profileInfo);
			await newProfile.save();

			currentUser.profile = newProfile._id;
			await currentUser.save();

			return res
				.status(201)
				.json({ message: "Profile created successfully", newProfile, success: true });
		}
		res.status(403).json({ message: "Unauthorized", success: false });
	} catch (err) {
		next(err);
	}
};

exports.profileViewGetController = async (req, res, next) => {
	try {
		const userId = currentUserId(req, res, next);
		if (userId) {
			const userProfile = await User.findOne({ _id: userId })
				.populate("profile")
				.select("primaryName courses userId profile");
			return res.status(200).json({ userProfile, message: "Success" }); // sending profile with basic user information
		}
		res.status(200).json({ message: "Unauthorized" });
	} catch (err) {
		next(err);
	}
};

exports.profileUpdatePatchController = async (req, res, next) => {
	try {
		const userId = currentUserId(req, res, next);
		if (userId) {
			const user = await User.findOne({ _id: userId }).select("profile");
			const profile = await Profile.findByIdAndUpdate(user.profile, req.body, { new: true });
			return res.status(200).json({ message: "Updated", profile });
		}
		res.status(200).json({ message: "Unauthorized" });
	} catch (err) {
		next(err);
	}
};
