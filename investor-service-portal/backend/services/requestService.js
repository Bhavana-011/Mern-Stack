const ServiceRequest = require("../models/ServiceRequest");
const Notification = require("../models/Notification");
const AuditLog = require("../models/AuditLog");

// SLA rules in hours
const SLA_RULES = {
  BANK_UPDATE: 48,
  NOMINEE_UPDATE: 72,
  ADDRESS_UPDATE: 24,
  COMPLAINT: 12,
  GENERAL_QUERY: 6
};

// Priority logic
function getPriority(requestType) {
  if (requestType === "COMPLAINT") return "HIGH";
  if (requestType === "GENERAL_QUERY") return "LOW";
  return "MEDIUM";
}

// Main request creation function
async function createRequest(data) {
  try {
    // Generate unique request ID
    const requestId = "REQ" + Date.now();

    // Get SLA hours from request type
    const slaHours = SLA_RULES[data.requestType];

    // Current time
    const now = new Date();

    // Calculate SLA deadline
    const slaDeadline = new Date(
      now.getTime() + slaHours * 60 * 60 * 1000
    );

    // Assign admin (simple demo logic)
    const assignedAdmin = "ADM001";

    // Create service request
    const request = await ServiceRequest.create({
      requestId,
      investorId: data.investorId,
      requestType: data.requestType,
      requestData: data.requestData || {},
      description: data.description || "",
      status: "OPEN",
      priority: getPriority(data.requestType),
      assignedTo: assignedAdmin,
      slaHours,
      slaDeadline
    });

    // Create notification
    await Notification.create({
      notificationId: "NOT" + Date.now(),
      investorId: data.investorId,
      requestId,
      message: `Request ${requestId} created successfully`,
      type: "STATUS_UPDATE",
      isRead: false
    });

    // Create audit log
    await AuditLog.create({
      logId: "LOG" + Date.now(),
      requestId,
      action: "REQUEST_CREATED",
      performedBy: data.investorId,
      oldValue: "",
      newValue: "OPEN"
    });

    return request;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRequest,
  SLA_RULES,
  getPriority
};