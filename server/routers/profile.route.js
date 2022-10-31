const router = require("express").Router();

const {
	profileCreateController,
	profileViewGetController,
	profileUpdatePatchController,getAllTeacherProfileController
} = require("../controllers/profile.controller");

const { profileValidator } = require("../validators/profileValidator");

router.post("/create", profileValidator, profileCreateController);
router.get("/view", profileViewGetController);
router.get("/view/teachers", getAllTeacherProfileController);
router.patch("/edit", profileValidator, profileUpdatePatchController);

module.exports = router;
