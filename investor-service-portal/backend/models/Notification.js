const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      required: true,
      unique: true
    },
    investorId: {
      type: String,
      required: true
    },
    requestId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["STATUS_UPDATE", "REMINDER", "RESOLUTION"],
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Notification",
  NotificationSchema
);