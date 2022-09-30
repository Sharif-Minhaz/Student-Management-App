const User = require("../models/User.model");

exports.getAllStudentController = async (req, res, next) => {
	try {
		const students = await User.find({ role: "student" });
		res.status(200).json({ students, message: "Success" });
	} catch (err) {
		next(err);
	}
};

exports.deleteStudentController = async (req, res, next) => {
	const { id } = req.params;
	try {
		await User.findByIdAndDelete(id);

		res.status(200).json({ message: "Student deleted successfully" });
	} catch (err) {
		next(err);
	}
};

exports.getSingleStudentController = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const student = await User.find({userId: userId});
		res.status(200).json({ student, message: "Success" });
	} catch (err) {
		next(err);
	}
};
