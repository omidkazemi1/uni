const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.teacherSignup);
router.post("/login", authController.login);

router.post("/code", authController.createCode);
router.post("/code/check", authController.resultCode);

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
