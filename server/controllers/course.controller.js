const AllCourses = require("../models/AllCourses.model");
const Course = require("../models/Course.model");
const User = require("../models/User.model");

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

exports.assignCourseToStudentController = async (req, res, next) => {
	const { userId, id } = req.params;
	try {
		const { courseCode, courseName, credit, courseTeacher, maxNumber } =
			await AllCourses.findById(id);

		const { courses } = await User.findOne({ userId }).populate("courses");
		for (let i = 0; i < courses.length; i++) {
			if (courses[i].courseCode === courseCode) {
				return res.status(200).json({ message: "Course already being added" });
			}
		}

		const courseEntry = new Course({
			courseCode,
			courseName,
			credit,
			courseTeacher,
			maxNumber,
		});

		const savedCourse = await courseEntry.save();
		const updatedCourse = await User.findOneAndUpdate(
			{ userId },
			{ $push: { courses: savedCourse._id } },
			{ new: true }
		);
		res.status(200).json({ message: "Course added successfully", updatedCourse });
	} catch (err) {
		next(err);
	}
};

exports.removeCourseOfStudentController = async (req, res, next) => {
	const { userId, id } = req.params;
	try {
		const deletedCourse = await User.findOneAndUpdate(
			{ userId },
			{ $pull: { courses: id } },
			{ new: true }
		);
		await Course.findByIdAndDelete(id);
		res.status(200).json({ message: "Course removed successfully", deletedCourse });
	} catch (err) {
		next(err);
	}
};
