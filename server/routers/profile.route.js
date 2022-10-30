const router = require("express").Router();

const {
	profileCreateController,
	profileViewGetController,
	profileUpdatePatchController,
} = require("../controllers/profile.controller");

const { profileValidator } = require("../validators/profileValidator");

router.post("/create", profileValidator, profileCreateController);
router.get("/view", profileViewGetController);
router.patch("/edit", profileValidator, profileUpdatePatchController);

module.exports = router;
