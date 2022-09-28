const { model, Schema } = require("mongoose");

const courseSchema = new Schema({
	courseName: {
		type: String,
		required: true,
	},
	courseTeacher: {
		type: String,
		required: true,
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
