const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.teacherSignup);
router.get("/test", authController.test);
router.post("/login", authController.login);
router.get("/code", authController.createCode);

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
