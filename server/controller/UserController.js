const Doctor = require("../model.js/Doctor");
const FeedBack = require("../model.js/FeedBack");
const Training = require("../model.js/Training");
const math = require("mathjs");
const validateMongoDbId = require("../utils/validateMongoDbId");
const User = require("../model.js/User");
const asyncHandler = require("express-async-handler");

// get a user
const getAUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);

  try {
    const user = await User.findById(id);
    const lectures = await Lecture.find({
      userId: id,
    });
    if (!user) throw new Error("No User Found!");
    res.send({ user, lectures });
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
    const newFeedback = new FeedBack({ text: req.body.text, user: user._id });
    await newFeedback.save();
    res.send("FeedBack Sent");
  } catch (error) {
    throw new Error(error);
  }
});

// create report
const report = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const diseases = await Training.find({});
    if (!diseases) {
      return res.send("No Disease Matched From our Database");
    }
    const distances = {};
    let testing = [];
for (const disease of diseases) {
  const distance = math.sqrt(
    Object.keys(req.body).reduce((acc, key) => {
      const valueDifference = req.body[key] - disease[key];
      console.log(disease.cholestarol)
      console.log(`Value difference for ${key}: ${valueDifference}`);
      return acc + Math.pow(valueDifference, 2);
    }, 0)
  );
  console.log(distance);
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

    res.send({ report: `You have High risk of ${nearestDisease}` });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { getAUser, getAllDoctors, feedback, report };
