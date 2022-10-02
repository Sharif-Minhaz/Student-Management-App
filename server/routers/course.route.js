const router = require("express").Router();
const {
	addCoursePostController,
	deleteCourseController,
	updateCourseController,
	getAllCoursesController,
	assignCourseToStudentController,
	removeCourseOfStudentController,
	entryMarkController,
	viewAssignCourseController,
} = require("../controllers/course.controller");

router.get("/all", getAllCoursesController);
router.get("/student/all-courses", viewAssignCourseController);
router.post("/add", addCoursePostController);
router.post("/entry-mark", entryMarkController);
router.patch("/update/:courseId", updateCourseController);
router.patch("/assign/:userId/:id", assignCourseToStudentController);
router.delete("/delete/:courseId", deleteCourseController);
router.delete("/remove-course/:userId/:id", removeCourseOfStudentController);

module.exports = router;
