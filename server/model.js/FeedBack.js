const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    role: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Feedback", feedbackSchema);
