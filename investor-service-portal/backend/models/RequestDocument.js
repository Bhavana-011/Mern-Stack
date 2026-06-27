const mongoose = require("mongoose");

const RequestDocumentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
    unique: true
  },
  requestId: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    enum: [
      "BANK_PROOF",
      "ADDRESS_PROOF",
      "ID_PROOF",
      "NOMINEE_PROOF"
    ],
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "RequestDocument",
  RequestDocumentSchema
);