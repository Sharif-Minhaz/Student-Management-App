const router = require("express").Router();
const {
	signupController,
	loginController,
	logoutController,
} = require("../controllers/auth.controller");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/check", verifyUser);

router.get("/logout", logoutController);

module.exports = router;
