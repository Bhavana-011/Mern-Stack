const requestService = require('../../services/requestService');
const slaService = require('../../services/slaService');
const ServiceRequest = require('../../models/ServiceRequest');
const AuditLog = require('../../models/AuditLog');
const Notification = require('../../models/Notification');
const RequestDocument = require('../../models/RequestDocument');


// ================== CREATE REQUEST ==================
exports.createRequest = async (req, res) => {
  try {
    const request = await requestService.createRequest({
      investorId: req.user.id,
      requestType: req.body.requestType,
      requestData: req.body.requestData,
      description: req.body.description
    });

    res.json({ success: true, request });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================== GET ALL REQUESTS (ADMIN) ==================
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find();

    res.json({
      success: true,
      count: requests.length,
      requests
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================== GET MY REQUESTS (INVESTOR) ==================
exports.getMyRequests = async (req, res) => {
  try {
    console.log("Token user id:", req.user.id);
    console.log("Type of id:", typeof req.user.id);

    const requests = await ServiceRequest.find({
      investorId: req.user.id.toString()
    });

    console.log("Requests found:", requests);

    res.json({
      success: true,
      requests
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ================== GET SINGLE REQUEST ==================
exports.getRequestById = async (req, res) => {
  try {
    const request = await ServiceRequest.findOne({
      requestId: req.params.id
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.json({
      success: true,
      request
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================== UPDATE STATUS ==================
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findOne({ requestId: id });

    const oldStatus = request.status;

    request.status = status;

    if (status === "RESOLVED") {
      request.resolvedAt = new Date();
    }

    await request.save();

    //  Audit
    await AuditLog.create({
      logId: "LOG" + Date.now(),
      requestId: id,
      action: "STATUS_CHANGED",
      performedBy: req.user.id,
      oldValue: oldStatus,
      newValue: status
    });

    //  Notification
    await Notification.create({
      notificationId: "NOT" + Date.now(),
      investorId: request.investorId,
      requestId: id,
      message: `Status updated to ${status}`,
      type: "STATUS_UPDATE"
    });

    res.json({ success: true, message: "Updated " });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================== UPLOAD DOCUMENT ==================
exports.uploadDocument = async (req, res) => {
  try {
    const { requestId, documentType, fileName } = req.body;

    const doc = await RequestDocument.create({
      documentId: "DOC" + Date.now(),
      requestId,
      documentType,
      fileName
    });

    res.json({ success: true, doc });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================== SLA DASHBOARD ==================
exports.getSLADashboard = async (req, res) => {
  try {
    const requests = await ServiceRequest.find();

    const summary = slaService.getSLASummary(requests);
    const compliance = slaService.getSLACompliance(requests);
    const avgTime = slaService.getAverageResolutionTime(requests);

    res.json({
      success: true,
      summary,
      compliance,
      avgTime
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};