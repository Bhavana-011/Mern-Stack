const mongoose = require("mongoose");
const InvestorSchema = new mongoose.Schema({
      investorId: {
    type: String,
    required: true,
    unique: true
  },

  fullName: {
    type: String,
    required: true
  },

  
password: {
  type: String,
  required: true
}
,

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  dob: {
    type: Date
  },

  panNumber: {
    type: String,
    required: true,
    unique: true
  },

    bankDetails: {
    bankName: String,
    accountNumber: String,
    ifscCode: String
  },

    nominee: {
    name: String,
    relationship: String,
    sharePercentage: Number
  },

    address: {
    line1: String,
    city: String,
    state: String,
    pincode: String
  }

  }, {
  timestamps: true
});

module.exports = mongoose.model("Investor", InvestorSchema);