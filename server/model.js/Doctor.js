const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

const DoctoreSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, require: true },
    speciality: { type: String, require: true },
    token: { type: String },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Doctor", DoctoreSchema);
