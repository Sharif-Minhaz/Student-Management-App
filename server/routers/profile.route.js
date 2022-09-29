const router = require("express").Router();
const { profileCreateController, profileViewGetController, profileUpdatePatchController } = require("../controllers/profile.controller");

router.post("/create", profileCreateController);
router.get("/view", profileViewGetController);
router.patch("/update", profileUpdatePatchController);

module.exports = router;
