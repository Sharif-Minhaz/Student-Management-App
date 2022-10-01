const router = require("express").Router();
const {
	getAllStudentController,
	getSingleStudentController,
	deleteStudentController,
} = require("../controllers/user.controller");

router.get("/all", getAllStudentController);
router.get("/find/:userId", getSingleStudentController);
router.delete("/delete/:id", deleteStudentController);

module.exports = router;
