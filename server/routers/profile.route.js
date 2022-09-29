const router = require("express").Router();
const { profileCreateController, profileViewGetController } = require("../controllers/profile.controller");

router.post("/create", profileCreateController);
router.get("/view", profileViewGetController);

module.exports = router;
