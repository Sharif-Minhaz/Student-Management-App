const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const { currentUserId } = require("../middlewares/currentUserId");
const cloudinary = require("../utils/cloudinary");
const { loggedInUser } = require("../middlewares/loggedInUser");
const { loggedInUserRole } = require("../middlewares/loggedInUserRole");

const defaultProfilePic =
	"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png";

const getProfileInfo = async (req, res, next) => {
	try {
		const body = { ...req.body };
		const userId = currentUserId(req, res, next);
		const user = await User.findOne({ _id: userId }).select("profile");

		const currentUser = await User.findOne({ userId: body.userId });

		// delete unnecessary properties for teacher and admin
		if (currentUser && currentUser.role !== "student") {
			delete body.localGuardianName;
			delete body.localGuardianEmail;
			delete body.localGuardianMobile;
		} else if (currentUser && currentUser.role !== "teacher") delete body.advisingRange;

		const existingProfile = user && (await Profile.findById(user.profile));

		let result;
		if (
			body.profilePicture &&
			body.profilePicture !== defaultProfilePic &&
			(!existingProfile || existingProfile.profilePicture !== body.profilePicture)
		) {
			result = await cloudinary.uploader.upload(body.profilePicture, {
				folder: "studentManagement",
			});
			if (existingProfile)
				await cloudinary.uploader.destroy(existingProfile.profilePicCloudinaryId);
		}

		const profileInfo = result
			? {
					...body,
					profilePicture: result.secure_url || "",
					profilePicCloudinaryId: result.public_id || "",
			  }
			: { ...body };
		return profileInfo;
	} catch (err) {
		next(err);
	}
};

exports.profileCreateController = async (req, res, next) => {
	try {
		const body = { ...req.body };
		const profileInfo = await getProfileInfo(req, res, next);
		const currentUser = await User.findOne({ userId: body.userId });

		if (currentUser) {
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

exports.deleteProfileController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedProfile = await Profile.findByIdAndDelete(id);
		if (deletedProfile.profilePicCloudinaryId)
			await cloudinary.uploader.destroy(deletedProfile.profilePicCloudinaryId);
		res.status(200).json({ success: true, message: "Unregistered student", deletedProfile });
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
			if (!userProfile.profile) {
				await User.findOneAndUpdate({ _id: userId }, { profile: null });
				return res.status(200).json({ userProfile, message: "Empty" });
			}
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
		const user = await User.findOne({ _id: userId }).select("profile");

		const profileInfo = await getProfileInfo(req, res, next);
		if (userId) {
			const profile = await Profile.findByIdAndUpdate(user.profile, profileInfo, {
				new: true,
			});
			return res.status(200).json({ message: "Information updated", success: true, profile });
		}
		res.status(200).json({ message: "Unauthorized user", success: false });
	} catch (err) {
		next(err);
	}
};

exports.getAllTeacherProfileController = async (req, res, next) => {
	try {
		const advisingRanges = [];
		const profiles = await Profile.find({ userId: { $regex: /^[0-9]+$/, $options: "g" } });
		profiles.forEach((range) => {
			if (range.advisingRange !== "") advisingRanges.push(range.advisingRange);
		});
		res.status(200).json({ success: true, profiles, advisingRanges });
	} catch (err) {
		next(err);
	}
};

exports.getAllStudentProfileController = async (req, res, next) => {
	const ranges = req.query?.range?.split("-"); // 100-300 <- range
	try {
		const currentUser = loggedInUserRole(req, res, next);

		const profiles = await Profile.find({ userId: { $regex: /-/, $options: "g" } }).sort(
			"userId"
		);

		if (currentUser === "admin") return res.status(200).json({ success: true, profiles });

		const filteredProfiles = profiles.filter((profile) => {
			let advisingRanges = Number(profile.userId?.split("-")[2]); // 201-35-3001 <- id

			return Number(ranges[0]) <= advisingRanges && Number(ranges[1] >= advisingRanges);
		});

		res.status(200).json({ success: true, profiles: filteredProfiles });
	} catch (err) {
		next(err);
	}
};

exports.assignAdvisingRangeToProfile = async (req, res, next) => {
	const { range, id } = req.body;

	try {
		const loggedInUserInfo = await loggedInUser(req, res, next);

		if (loggedInUserInfo) {
			const updatedProfile = await Profile.findByIdAndUpdate(
				id,
				{
					advisingRange: range,
				},
				{ new: true }
			);

			const allRange = await Profile.find({
				userId: { $regex: /^[0-9]+$/, $options: "g" },
			}).select("advisingRange");

			if (updatedProfile) {
				return res.status(200).json({
					message: "Set advising range successfully",
					success: true,
					updatedProfile,
				});
			}
			return res.status(200).json({ success: false, message: "Range not updated" });
		}

		return res
			.status(200)
			.json({ message: "Profile not found to update range!", success: false });
	} catch (err) {
		next(err);
	}
};
