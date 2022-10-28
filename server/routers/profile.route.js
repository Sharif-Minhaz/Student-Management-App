const router = require("express").Router();
const upload = require("../middlewares/upload");
const {
	profileCreateController,
	profileViewGetController,
	profileUpdatePatchController,
} = require("../controllers/profile.controller");

router.post("/create", upload.single("profilePicture"), profileCreateController);
router.get("/view", profileViewGetController);
router.patch("/update", profileUpdatePatchController);

module.exports = router;
