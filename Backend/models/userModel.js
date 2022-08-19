const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "user already exists plz login"],
    validate: [validator.isEmail, "please enter valid email"],
  },
  phone: {
    type: String,
    validate: [validator.isNumeric, "Please enter valid Phone Number!"],
    // unique: true,
    // required: [true, "Please enter your Phone Number!"],
  },
  linkedin: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
