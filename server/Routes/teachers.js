const express = require("express");

const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

// *) auth route teacher
router.post("/signup", authController.teacherSignup);
router.post("/login", authController.teacherLogin);
router.get("/logout", authController.logout);
router.post("/code", authController.createCode);

router.get(
  "/",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.showMe
);

// *) class and student manage route
router
  .route("/class/:id")
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

router.delete(
  "/class/:classId/:studentId",
  authController.protect,
  authController.restrictTo("teacher"),
  teacherController.removeStudent
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

module.exports = router;
