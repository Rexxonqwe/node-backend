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
