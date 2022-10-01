const { Schema, model } = require("mongoose");

const allCoursesSchema = new Schema({
	courseCode: {
		type: String,
		required: true,
		unique: true,
		immutable: true,
	},
	courseName: {
		type: String,
		required: true,
		unique: true,
		immutable: true,
	},
	courseTeacher: {
		type: String,
		required: true,
	},
	credit: {
		type: Number,
		max: 4,
		min: 1,
		required: true,
	},
	maxNumber: {
		type: Number,
		required: true,
	},
});

const AllCourses = model("allCourse", allCoursesSchema);

module.exports = AllCourses;
