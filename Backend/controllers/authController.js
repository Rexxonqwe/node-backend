const User = require("../models/userModel");
const UserOtp = require("../models/userOtpModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  console.log(res);

  // Remove password from output
  // user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.generateOTP = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      throw new Error("Please enter email!");
    }
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error(
        "Your are already part of commuinty!, Please Login!",
        400
      );
    }
    /******************************************/
    let otp = JSON.stringify(Math.floor(Math.random() * 10000 + 1));
    if (otp.length <= 3) {
      otp = otp + "0";
    }
    let userOTP = await UserOtp.findOne({ emailId: email });
    let newUserOTP;
    if (userOTP) {
      newUserOTP = await UserOtp.update({ otp: otp });
    } else {
      newUserOTP = await UserOtp.create({ otp: otp, emailId: email });
    }

    res.status(200).json({
      status: "success",
      otp: otp,
      data: {
        data: newUserOTP,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
};

exports.checkOTP = async (req, res) => {
  try {
    let newUser;
    const { email, otp } = req.body;
    const userDoc = await UserOtp.findOne({ emailId: email });
    if (userDoc.otp === otp * 1) {
      newUser = await User.create({ email });
    } else {
      throw new Error("OTP is incorrect!", 404);
    }

    createSendToken(newUser, 200, res);

    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     userDoc,
    //   },
    // });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
