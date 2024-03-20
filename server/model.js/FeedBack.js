const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    require: true,
  },
});

//Export the model
module.exports = mongoose.model("Feedback", feedbackSchema);
