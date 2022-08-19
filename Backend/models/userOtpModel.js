const mongoose = require("mongoose");
const validator = require("validator");

const userOtpSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  emailId: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email!"],
  },
  mobileNo: {
    type: String,
  },
  otp: {
    type: Number,
  },
  creatationTime: {
    type: Date,
  },
  expiryTime: {
    type: Date,
  },
});

const UserOtp = new mongoose.model("UserOtp", userOtpSchema);
module.exports = UserOtp;
