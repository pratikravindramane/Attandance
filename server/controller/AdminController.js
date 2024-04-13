const Doctor = require("../model.js/Doctor");
const FeedBack = require("../model.js/FeedBack");
const Training = require("../model.js/Training");
const User = require("../model.js/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// get all
const getAll = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ isAdmin: false });
    if (!user) throw new Error("No User Found!");
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Create Doctor
const createDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      throw new Error("Doctor Already Exist with this Email");
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const newDoctor = new Doctor({ ...req.body, password: hash });

    await newDoctor.save();
    res.send("Doctor Added");
  } catch (error) {
    throw new Error(error);
  }
});

// Create Training
const createTraining = asyncHandler(async (req, res) => {
  try {
    const newTraining = new Training(req.body);
    await newTraining.save();
    res.send("Training Added");
  } catch (error) {
    throw new Error(error);
  }
});

// get all feeback
const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const feeback = await FeedBack.find({}).populate("user").populate("doctor");
    if (!feeback) throw new Error("No FeedBack Found!");
    res.send(feeback);
  } catch (error) {
    throw new Error(error);
  }
});

// get all trainings
const getAllTraining = asyncHandler(async (req, res) => {
  try {
    const trainings = await Training.find({});
    if (!trainings) throw new Error("No Training Found!");
    res.send(trainings);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const trainings = await Doctor.findByIdAndDelete(req.params.id);
    if (!trainings) throw new Error("No Doctor Found!");
    res.send("Deleted Successfully");
  } catch (error) {
    throw new Error(error);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users) throw new Error("No User Found!");
    res.send("Deleted Successfully");
  } catch (error) {
    throw new Error(error);
  }
});
const deleteTraining = asyncHandler(async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) throw new Error("No User Found!");
    res.send("Delted Successfully");
  } catch (error) {
    throw new Error(error);
  }
});
const deleteFeedback = asyncHandler(async (req, res) => {
  try {
    const feedback = await FeedBack.findByIdAndDelete(req.params.id);
    if (!feedback) throw new Error("No User Found!");
    res.send("Delted Successfully");
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAll,
  createDoctor,
  createTraining,
  getAllFeedback,
  getAllTraining,
  deleteDoctor,
  deleteUser,
  deleteTraining,
  deleteFeedback
};
