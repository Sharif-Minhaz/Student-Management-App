const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		required: true,
	},
	mobile: String,
	userId: { type: String, required: true },
	profilePicture: {
		type: String,
		default:
			"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png",
	},
	profilePicCloudinaryId: String,
	presentAddress: String,
	permanentAddress: String,
	localGuardianName: String,
	localGuardianEmail: {
		type: String,
		lowercase: true,
	},
	localGuardianMobile: String,
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
