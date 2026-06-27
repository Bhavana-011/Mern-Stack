const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  logId: {
    type: String,
    required: true,
    unique: true
  },
  requestId: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: [
      "REQUEST_CREATED",
      "STATUS_CHANGED",
      "ASSIGNED_ADMIN",
      "RESOLVED"
    ],
    required: true
  },
  performedBy: {
    type: String,
    required: true
  },
  oldValue: String,
  newValue: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "AuditLog",
  AuditLogSchema
);