const router = require("express").Router();
const {
	signupController,
	loginController,
	logoutController,
	checkIsLoggedInController,
	changePasswordPostController,
	checkPasswordPostController,
} = require("../controllers/auth.controller");
const { loginValidator } = require("../validators/login.validator");
const { signupValidator } = require("../validators/signup.validator");
const { checkPasswordValidator } = require("../validators/checkPassword.validator");
const { changePasswordValidator } = require("../validators/changePassword.validator");

router.post("/signup", signupValidator, signupController);
router.post("/login", loginValidator, loginController);

router.get("/check", checkIsLoggedInController);

router.post("/check-password", checkPasswordValidator, checkPasswordPostController);
router.post("/change-password", changePasswordValidator, changePasswordPostController);
router.post("/logout", logoutController);

module.exports = router;
