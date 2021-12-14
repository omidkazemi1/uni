const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const studentController = require("../controllers/studentController");

router.param("examId", (req, res, next) => {
  authController.objectIdControll(req.params.examId, next);
});

router.param("classId", (req, res, next) => {
  authController.objectIdControll(req.params.examId, next);
});

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

router
  .route("/exam")
  .get(
    authController.protect,
    authController.restrictTo("student"),
    studentController.examList
  )
  .post(
    authController.protect,
    authController.restrictTo("student"),
    studentController.completeExam
  );

router
  .route("/exam/:examId")
  .get(
    authController.protect,
    authController.restrictTo("student"),
    studentController.singleExam
  );

router.get(
  "/class/:classId/student",
  authController.protect,
  authController.restrictTo("student"),
  studentController.studentsList
);

module.exports = router;
