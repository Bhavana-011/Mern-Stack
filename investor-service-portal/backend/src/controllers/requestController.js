const requestService = require('../../services/requestService');
const slaService = require('../../services/slaService');
const ServiceRequest = require('../../models/ServiceRequest');
const AuditLog = require('../../models/AuditLog');
const Notification = require('../../models/Notification');
const RequestDocument = require('../../models/RequestDocument');


//  CREATE REQUEST (uses requestService)
exports.createRequest = async (req, res) => {
  try {
    const data = {
      investorId: req.user.id,
      requestType: req.body.requestType,
      requestData: req.body.requestData,
      description: req.body.description
    };

    const request = await requestService.createRequest(data);

    res.json({
      success: true,
      request
    });

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



//  UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findOne({ requestId: id });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const oldStatus = request.status;

    request.status = status;

    if (status === "RESOLVED") {
      request.resolvedAt = new Date();
    }

    await request.save();

    //  Audit log
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

    res.json({
      success: true,
      message: "Status updated "
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



//  UPLOAD DOCUMENT
exports.uploadDocument = async (req, res) => {
  try {
    const { requestId, documentType, fileName } = req.body;

    const doc = await RequestDocument.create({
      documentId: "DOC" + Date.now(),
      requestId,
      documentType,
      fileName
    });

    res.json({
      success: true,
      document: doc
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



//  GET SLA DASHBOARD (uses slaService)
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
      averageResolutionTime: avgTime
    });

  } catch (err) {
    console.log("SLA ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};