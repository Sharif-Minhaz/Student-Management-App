const router = require("express").Router();
const {
	getAllStudentController,
	getSingleStudentController,
	deleteStudentController,
} = require("../controllers/user.controller");

router.get("/all", getAllStudentController);
router.delete("/delete/:id", deleteStudentController);
router.get("/find/:userId", getSingleStudentController);

module.exports = router;
