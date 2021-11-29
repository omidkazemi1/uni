const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.teacherSignup);
router.post("/login", authController.teacherLogin);
router.post("/code", authController.createCode);
router.post("/code/check", authController.resultCode);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);

module.exports = router;
