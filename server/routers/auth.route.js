const router = require("express").Router();
const {
	signupController,
	loginController,
	logoutController,
} = require("../controllers/auth.controller");
const { loginValidator } = require("../validators/login.validator");
const { signupValidator } = require("../validators/signup.validator");
const { verifyUser } = require("../middlewares/verifyUser");

router.post("/signup", signupValidator, signupController);
router.post("/login", loginValidator, loginController);

router.get("/check", verifyUser);

router.get("/logout", logoutController);

module.exports = router;
