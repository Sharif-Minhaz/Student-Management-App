const AllCourses = require("../models/AllCourses.model");
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const { loggedInUserRole } = require("../middlewares/loggedInUserRole");
const { currentUserId } = require("../middlewares/currentUserId");

exports.getAllCoursesController = async (req, res, next) => {
	try {
		const allCourses = await AllCourses.find();
		res.status(200).json({ message: "Success", allCourses });
	} catch (err) {
		next(err);
	}
};

exports.addCoursePostController = async (req, res, next) => {
	const userType = loggedInUserRole(req, res, next);
	if (userType !== "admin")
		return res.status(200).json({ message: "Unauthorized", success: false });
	try {
		const newCourse = new AllCourses(req.body);
		await newCourse.save();
		res.status(201).json({ message: "Course added successfully", success: true });
	} catch (err) {
		next(err);
	}
};

exports.deleteCourseController = async (req, res, next) => {
	const { courseCode } = req.params;
	const userType = loggedInUserRole(req, res, next);
	if (userType !== "admin")
		return res.status(200).json({ message: "Unauthorized", success: false });
	try {
		const deletedCourse = await AllCourses.findOneAndDelete({ courseCode: courseCode });
		res.status(200).json({
			message: "Course deleted successfully",
			deletedCourse,
			success: true,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateCourseController = async (req, res, next) => {
	const { courseId } = req.params;
	const { courseTeacher, credit, maxNumber } = req.body;
	const userType = loggedInUserRole(req, res, next);
	if (userType !== "admin")
		return res.status(200).json({ message: "Unauthorized", success: false });
	try {
		const updatedCourse = await AllCourses.findOneAndUpdate(
			{ _id: courseId },
			{ courseTeacher, credit, maxNumber },
			{
				new: true,
			}
		);
		res.status(200).json({
			message: "Course updated successfully",
			updatedCourse,
			success: true,
		});
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
		// Identifying if the course is already assigned
		for (let i = 0; i < courses.length; i++) {
			if (courses[i].courseCode === courseCode)
				return res.status(200).json({ message: "Course already being added" });
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

exports.entryMarkController = async (req, res, next) => {
	const mark = Number(req.body.mark);
	const { courseId } = req.body;
	const userType = loggedInUserRole(req, res, next);

	if (userType !== "teacher") return res.status(403).json({ message: "Unauthorized" });

	try {
		const entryMarkInfo = await Course.findByIdAndUpdate(
			courseId,
			{ examNumber: mark },
			{ new: true }
		);
		res.status(200).json({ message: "Number entry done.", entryMarkInfo });
	} catch (err) {
		next(err);
	}
};

exports.viewAssignCourseController = async (req, res, next) => {
	const userType = loggedInUserRole(req, res, next);
	const id = currentUserId(req, res, next);
	if (id && userType === "student") {
		const coursesData = await User.findOne({ _id: id }).populate("courses").select("courses");
		return res.json(coursesData.courses);
	}
	res.status(200).json({ message: "Something went wrong!" });
};
