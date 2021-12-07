const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const studentController = require("../controllers/studentController");

// *) auth route student
router.post("/login", authController.studentLogin);
router.post("/code", authController.createCode);
router.get("/logout", authController.logout);

router.get(
  "/class",
  authController.protect,
  authController.restrictTo("student"),
  studentController.classList
);

router.get(
  "/exam",
  authController.protect,
  authController.restrictTo("student"),
  studentController.examList
);

router.get(
  "/exam/:examId",
  authController.protect,
  authController.restrictTo("student"),
  studentController.singleExam
);

router.get(
  "/class/:id",
  authController.protect,
  authController.restrictTo("student"),
  studentController.studentsList
);

module.exports = router;
