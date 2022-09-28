const { model, Schema } = require("mongoose");

const studentProfileSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	studentId: String,
	profilePicture: {
		type: String,
	},
	presentAddress: String,
	currentAddress: String,
	localGuardianName: String,
	localGuardianEmail: String,
	localGuardianMobile: String,
});

const StudentProfile = model("studentProfile", studentProfileSchema);

module.exports = StudentProfile;
