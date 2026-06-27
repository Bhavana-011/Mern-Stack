const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
      adminId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

    passwordHash: {
    type: String,
    required: true
  },

    role: {
    type: String,
    enum: ["ADMIN", "MANAGER", "EXECUTIVE"],
    required: true
  },

    department: {
    type: String,
    default: "Investor Services"
  },

  active: {
    type: Boolean,
    default: true
  }

  }, {
  timestamps: true
});

module.exports = mongoose.model("Admin", AdminSchema);