const router = require("express").Router();
const {
	addCoursePostController,
	deleteCourseController,
	updateCourseController,
	getAllCoursesController,
} = require("../controllers/course.controller");

router.get("/all", getAllCoursesController);
router.post("/add", addCoursePostController);
router.patch("/update/:courseId", updateCourseController);
router.delete("/delete/:courseId", deleteCourseController);

module.exports = router;
