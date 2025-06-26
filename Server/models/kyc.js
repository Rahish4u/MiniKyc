const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  name: String,
  aadhaar: String,
  pan: String,
  dob: String,
  mobile: String,
  address: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("KYC", kycSchema);