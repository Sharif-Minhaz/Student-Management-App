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
	userId: String,
	profilePicture: {
		type: String,
		default:
			"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png",
	},
	presentAddress: String,
	currentAddress: String,
	localGuardianName: String,
	localGuardianEmail: {
		type: String,
		lowercase: true,
	},
	localGuardianMobile: String,
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
