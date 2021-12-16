const express = require("express");

const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

router.param("classId", (req, res, next) => {
  authController.objectIdControll(req.params.classId, next);
});

router.param("studentId", (req, res, next) => {
  authController.objectIdControll(req.params.studentId, next);
});

router.param("examId", (req, res, next) => {
  authController.objectIdControll(req.params.examId, next);
});

// *) auth route teacher
router.post("/signup", authController.teacherSignup);
router.post("/login", authController.teacherLogin);
router.get("/logout", authController.logout);
router.post("/code", authController.createCode);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.showMe
  )
  .patch(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.updateMe
  );

// *) class and student manage route

router.get(
  "/class/:classId/student",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.studentList
);

router.delete(
  "/class/:classId/:studentId",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.removeStudent
);

router
  .route("/class/:classId")
  .get(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.showClass
  )
  .delete(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.deleteClass
  )
  .patch(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.updateClass
  );

router
  .route("/student")
  .post(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.addStudent
  );

router
  .route("/class")
  .post(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.addClass
  )
  .get(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.classList
  );

// exam routes
router
  .route("/exam")
  .get(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.examList
  )
  .post(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.addExam
  );

router.delete(
  "/exam/:examId",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.deleteExam
);

router.get(
  "/exam/student/:examId",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.listStudentExam
);
module.exports = router;
