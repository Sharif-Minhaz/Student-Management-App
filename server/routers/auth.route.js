const router = require("express").Router();
const {
	signupController,
	loginController,
	logoutController,
	checkIsLoggedInController,
} = require("../controllers/auth.controller");
const { loginValidator } = require("../validators/login.validator");
const { signupValidator } = require("../validators/signup.validator");

router.post("/signup", signupValidator, signupController);
router.post("/login", loginValidator, loginController);

router.get("/check", checkIsLoggedInController);

router.post("/logout", logoutController);

module.exports = router;
