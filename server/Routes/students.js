const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const studentController = require("../controllers/studentController");

// *) auth route student
router.post("/login", authController.studentLogin);
router.post("/code", authController.createCode);

router.get(
  "/class",
  authController.protect,
  authController.restrictTo("student"),
  studentController.classList
);

module.exports = router;
