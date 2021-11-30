const express = require("express");

const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

router.post("/signup", authController.teacherSignup);
router.post("/login", authController.teacherLogin);
router.post("/code", authController.createCode);
router.post("/code/check", authController.resultCode);

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

router
  .route("/student")
  .post(
    authController.protect,
    authController.restrictTo("teacher"),
    teacherController.addStudent
  );

module.exports = router;
