const User = require("../models/userModel");

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
    const newUser = await User.findByIdAndUpdate(id, password);
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
    const newUser = await User.findByIdAndUpdate(id, {
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
