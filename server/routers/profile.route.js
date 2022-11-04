const router = require("express").Router();

const {
	profileCreateController,
	profileViewGetController,
	profileUpdatePatchController,
	getAllTeacherProfileController,
	getAllStudentProfileController,
	deleteProfileController,
} = require("../controllers/profile.controller");

const { profileValidator } = require("../validators/profileValidator");

router.post("/create", profileValidator, profileCreateController);
router.get("/view", profileViewGetController);
router.get("/view/teachers", getAllTeacherProfileController);
router.get("/view/students", getAllStudentProfileController);
router.patch("/edit", profileValidator, profileUpdatePatchController);
router.delete("/delete/:id", deleteProfileController);

module.exports = router;
