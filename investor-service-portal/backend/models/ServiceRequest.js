const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true
    },

    investorId: {
      type: String,
      required: true
    },

    requestType: {
      type: String,
      enum: [
        "BANK_UPDATE",
        "NOMINEE_UPDATE",
        "ADDRESS_UPDATE",
        "COMPLAINT",
        "GENERAL_QUERY"
      ],
      required: true
    },

    requestData: {
      type: Object
    },

    description: String,

    status: {
      type: String,
      enum: [
        "OPEN",
        "IN_PROGRESS",
        "APPROVED",
        "REJECTED",
        "RESOLVED"
      ],
      default: "OPEN"
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM"
    },

    assignedTo: String,

    slaHours: Number,

    slaDeadline: Date,

    resolvedAt: Date,

    resolutionRemark: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceRequest",
  ServiceRequestSchema
);