function getSLAStatus(request) {
  const now = new Date();

  // Already resolved
  if (request.status === "RESOLVED") {
    return "RESOLVED";
  }

  // Deadline crossed
  if (now > new Date(request.slaDeadline)) {
    return "BREACHED";
  }

  // Remaining time in hours
  const remainingMs =
    new Date(request.slaDeadline) - now;

  const remainingHours =
    remainingMs / (1000 * 60 * 60);

  // Warning if <= 4 hours left
  if (remainingHours <= 4) {
    return "WARNING";
  }

  return "ON_TRACK";
}

// Dashboard summary
function getSLASummary(requests) {
  let onTrack = 0;
  let warning = 0;
  let breached = 0;
  let resolved = 0;

  requests.forEach((request) => {
    const status = getSLAStatus(request);

    if (status === "ON_TRACK") onTrack++;
    else if (status === "WARNING") warning++;
    else if (status === "BREACHED") breached++;
    else if (status === "RESOLVED") resolved++;
  });

  return {
    onTrack,
    warning,
    breached,
    resolved
  };
}

// SLA compliance percentage
function getSLACompliance(requests) {
  const resolvedRequests = requests.filter(
    (req) => req.status === "RESOLVED"
  );

  if (resolvedRequests.length === 0) {
    return 0;
  }

  let withinSLA = 0;

  resolvedRequests.forEach((req) => {
    if (
      req.resolvedAt &&
      new Date(req.resolvedAt) <= new Date(req.slaDeadline)
    ) {
      withinSLA++;
    }
  });

  return (
    (withinSLA / resolvedRequests.length) * 100
  ).toFixed(2);
}

// Average resolution time in hours
function getAverageResolutionTime(requests) {
  const resolvedRequests = requests.filter(
    (req) => req.status === "RESOLVED" && req.resolvedAt
  );

  if (resolvedRequests.length === 0) {
    return 0;
  }

  let totalHours = 0;

  resolvedRequests.forEach((req) => {
    const created = new Date(req.createdAt);
    const resolved = new Date(req.resolvedAt);

    const hours =
      (resolved - created) / (1000 * 60 * 60);

    totalHours += hours;
  });

  return (
    totalHours / resolvedRequests.length
  ).toFixed(2);
}

module.exports = {
  getSLAStatus,
  getSLASummary,
  getSLACompliance,
  getAverageResolutionTime
};