import {
  getAllRequestsApi,
  getRequestByIdApi,
  getSLADashboardApi,
  updateRequestStatusApi,
  uploadDocumentApi,
} from "../api/requestApi";

import type { RequestStatus } from "../types/request";

export const requestService = {
  async getAllRequests() {
    return await getAllRequestsApi();
  },

  async getRequest(id: string) {
    return await getRequestByIdApi(id);
  },

  async getSLADashboard() {
    return await getSLADashboardApi();
  },

  async updateStatus(
    id: string,
    status: RequestStatus
  ) {
    return await updateRequestStatusApi(
      id,
      status
    );
  },

  async uploadDocument(payload: {
    requestId: string;
    documentType: string;
    fileName: string;
  }) {
    return await uploadDocumentApi(payload);
  },
};