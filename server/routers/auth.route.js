const router = require("express").Router();
const { loginController, signupController } = require("../controllers/auth.controller");
const {verifyUser} = require("../middlewares/verifyUser")

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/check", verifyUser);

module.exports = router;
