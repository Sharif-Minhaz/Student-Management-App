const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
	primaryName: {
		type: String,
		required: true,
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: "TeacherProfile",
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	employeeId: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const Teacher = model("student", teacherSchema);

module.exports = Teacher;
