const User = require("../models/userModel");
const {promisify}  = require('util');
const jwt = require('jwt');

exports.signupWithEmail = async (req, res) => {
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

    const newUser = await User.create({ email: email });
    res.status(200).json({
      status: "success",
      users: newUser,
    });
    // > JSON.stringify(Math.floor((Math.random()*10000)+1)).length
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.createUserPassword = async (req, res) => {
  try {
    //
  const { password } = req.body;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, Please login to get access!", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
    const newUser = await User.findByIdAndUpdate(decoded.id, password);
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    //
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.submitUserDetails = async (req, res) => {
  try {
    //
  const { fname, lname, linkedInURL, city, state, country } = req.body;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, Please login to get access!", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
    const newUser = await User.findByIdAndUpdate(decoded.id, {
      fname,
      lname,
      linkedInURL,
      city,
      state,
      country,
    });
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    //
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
