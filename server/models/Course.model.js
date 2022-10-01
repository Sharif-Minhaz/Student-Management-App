const { model, Schema } = require("mongoose");

const courseSchema = new Schema({
	courseCode: {
		type: String,
	},
	courseName: {
		type: String,
		required: true,
	},
	courseTeacher: {
		type: String,
		required: true,
	},
	credit: {
		type: Number,
	},
	examNumber: {
		type: Number,
	},
	maxNumber: {
		type: Number,
	},
});

const Course = model("course", courseSchema);

module.exports = Course;
