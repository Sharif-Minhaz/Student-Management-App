const AllCourses = require("../models/AllCourses.model");

exports.getAllCoursesController = async (req, res, next) => {
	try {
		const allCourses = await AllCourses.find();
		res.status(200).json({ message: "Success", allCourses });
	} catch (err) {
		next(err);
	}
};

exports.addCoursePostController = async (req, res, next) => {
	try {
		const newCourse = new AllCourses(req.body);
		await newCourse.save();
		res.status(201).json({ message: "Course added successfully" });
	} catch (err) {
		next(err);
	}
};

exports.deleteCourseController = async (req, res, next) => {
	const { courseId } = req.params;
	try {
		const deletedCourse = await AllCourses.findOneAndDelete(courseId);
		res.status(200).json({ message: "Course deleted successfully", deletedCourse });
	} catch (err) {
		next(err);
	}
};

exports.updateCourseController = async (req, res, next) => {
	const { courseId } = req.params;
	try {
		const updatedCourse = await AllCourses.findOneAndUpdate(courseId, req.body, { new: true });
		res.status(200).json({ message: "Course updated successfully", updatedCourse });
	} catch (err) {
		next(err);
	}
};
