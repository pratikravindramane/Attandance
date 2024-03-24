const Doctor = require("../model.js/Doctor");
const FeedBack = require("../model.js/FeedBack");
const Training = require("../model.js/Training");
const User = require("../model.js/User");
const asyncHandler = require("express-async-handler");

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
  const { email } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      throw new Error("Doctor Already Exist with this Email");
    }
    const newDoctor = new Doctor(req.body);

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
    const feeback = await FeedBack.find({}).populate("user");
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
module.exports = {
  getAll,
  createDoctor,
  createTraining,
  getAllFeedback,
  getAllTraining,
};
