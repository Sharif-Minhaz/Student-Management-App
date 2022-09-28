const { model, Schema } = require("mongoose");

const teacherProfileSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	employeeId: String,
	profilePicture: {
		type: String,
	},
	presentAddress: String,
	currentAddress: String,
});

const TeacherProfile = model("teacherProfile", teacherProfileSchema);

module.exports = TeacherProfile;
