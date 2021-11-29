const express = require("express");

const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

router.patch("/updateMe", authController.protect, teacherController.updateMe);
router.delete("/deleteMe", authController.protect, teacherController.deleteMe);
router.route("/").get(teacherController.getAllUser);

module.exports = router;
