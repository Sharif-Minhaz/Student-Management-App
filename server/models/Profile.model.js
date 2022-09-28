const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	userId: String,
	profilePicture: {
		type: String,
	},
	presentAddress: String,
	currentAddress: String,
	localGuardianName: String,
	localGuardianEmail: String,
	localGuardianMobile: String,
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
