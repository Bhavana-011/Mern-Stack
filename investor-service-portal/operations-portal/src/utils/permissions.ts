

export const permissions = {
  canViewDashboard(role: string | null) {
    return ["ADMIN", "MANAGER", "EXECUTIVE"].includes(role ?? "");
  },

  canViewRequests(role: string | null) {
    return ["ADMIN", "MANAGER", "EXECUTIVE"].includes(role ?? "");
  },

  canViewSLA(role: string | null) {
    return ["ADMIN", "MANAGER"].includes(role ?? "");
  },

  canUpdateStatus(role: string | null) {
    return ["ADMIN", "MANAGER", "EXECUTIVE"].includes(role ?? "");
  },

  canUploadDocuments(role: string | null) {
    return ["ADMIN", "MANAGER", "EXECUTIVE"].includes(role ?? "");
  },

  canDeleteRequest(role: string |null) {
    return role === "ADMIN";
  },
};