const Doctor = require("../model.js/Doctor");
const FeedBack = require("../model.js/FeedBack");
const Training = require("../model.js/Training");
const math = require("mathjs");
const validateMongoDbId = require("../utils/validateMongoDbId");
const User = require("../model.js/User");
const asyncHandler = require("express-async-handler");
const Report = require("../model.js/Report");

// get a user
const getAUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);

  try {
    const user = await User.findById(id);
    if (!user) return res.send({ noUser: true });
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

// get all doctors
const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if (!doctors) throw new Error("No Doctor Found!");
    res.send(doctors);
  } catch (error) {
    throw new Error(error);
  }
});

// Create Feedback
const feedback = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("No User Found!");
    const newFeedback = new FeedBack({
      text: req.body.text,
      user: user._id,
      role: req.body.role,
    });
    await newFeedback.save();
    res.send("FeedBack Sent");
  } catch (error) {
    throw new Error(error);
  }
});

// create report
const report = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    age,
    gender,
    chestPain,
    sugar,
    restecg,
    exang,
    slope,
    ca,
    bp,
    cholesterol,
    thalach,
    thal,
    oldPeak,
  } = req.body;
  let obj = {
    age,
    chestPain,
    sugar,
    restecg,
    exang,
    slope,
    ca,
    bp,
    thal,
    cholesterol,
    thalach,
    oldPeak,
  };
  validateMongoDbId(id);
  try {
    const diseases = await Training.find({});
    if (!diseases) {
      return res.send("No Disease Matched From our Database");
    }
    const distances = {};
    for (const disease of diseases) {
      const distance = math.sqrt(
        Object.keys(obj).reduce((acc, key) => {
          const valueDifference = obj[key] - disease[key];
          return acc + Math.pow(valueDifference, 2);
        }, 0)
      );
      distances[disease.disease] = distance;
    }

    // Find the nearest disease
    const nearestDisease = Object.keys(distances).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    // update user
    const updateUser = await User.findByIdAndUpdate(id, {
      report: nearestDisease,
    });

    const report = new Report({
      age,
      chestPain,
      sugar,
      restecg,
      exang,
      slope,
      ca,
      bp,
      thal,
      cholesterol,
      thalach,
      oldPeak,
      gender,
      result: nearestDisease,
      user: id,
    });
    await report.save();
    res.send({ report: `You have ${nearestDisease}` });
  } catch (error) {
    throw new Error(error.message);
  }
});

// get all user reports
const allReports = asyncHandler(async (req, res) => {
  try {
    const reports = await Report.find({ user: req.params.id }).populate("user");
    res.send(reports);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { getAUser, getAllDoctors, feedback, report, allReports };
