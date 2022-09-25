const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
	primaryName: {
		type: String,
		required: true,
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: "Profile",
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const Student = model("student", studentSchema);

module.exports = Student;
