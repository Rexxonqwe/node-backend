const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/emailSignup").post(userController.signupWithEmail);
router.route("/generateOTP").post(authController.generateOTP);
router.route("/checkOTP").post(authController.checkOTP);
router.route("/createPassword").post(userController.createUserPassword);
router.route("/userDetails").post(userController.submitUserDetails);

module.exports = router;
