const asyncHandler = require("express-async-handler");
const User = require("../model.js/User");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const Report = require("../model.js/Report");
const Doctor = require("../model.js/Doctor");
const FeedBack = require("../model.js/FeedBack");
const validateMongoDbId = require("../utils/validateMongoDbId");

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const user = await Doctor.findOne({ email });
    if (!user) throw new Error("No Doctor found with this Email");
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(user._id, user.isAdmin);

    //update signin
    user.token = token;
    await user.save();
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});
// get all reports
const allReports = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find({}).populate("user");
    res.send(reports);
  } catch (error) {
    throw new Error(error);
  }
});
// get doctor
const getADoctor = asyncHandler(async (req, res) => {
  try {
    const reports = await Doctor.findById(req.params.id);
    res.send(reports);
  } catch (error) {
    throw new Error(error);
  }
});
// Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Doctor.findOne({ email });
    if (!user) throw new Error("No Doctor Found With This Email");
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const token = genrateToken(user._id, false);
    user.password = hash;
    user.token = token;
    await user.save();
    res.send(user); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
// Create Feedback
const feedback = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const user = await Doctor.findById(id);
    if (!user) throw new Error("No User Found!");
    const newFeedback = new FeedBack({
      text: req.body.text,
      doctor: user._id,
      role: req.body.role,
    });
    await newFeedback.save();
    res.send("FeedBack Sent");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  login,
  allReports,
  getADoctor,
  changePassword,
  feedback
};
