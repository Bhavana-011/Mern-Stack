import api from "./axios";

import type {
  RequestsResponse,
  RequestResponse,
  SLAResponse,
} from "../types/request";
import type { RequestStatus } from "../types/request";

export const getAllRequestsApi = async () => {
  const response =
    await api.get<RequestsResponse>(
      "/requests/all"
    );

  return response.data;
};

export const getRequestByIdApi = async (
  id: string
) => {
  const response =
    await api.get<RequestResponse>(
      `/requests/${id}`
    );

  return response.data;
};

export const getSLADashboardApi = async () => {
  const response =
    await api.get<SLAResponse>(
      "/requests/sla"
    );

  return response.data;
};



export const updateRequestStatusApi = async (
  id: string,
  status: RequestStatus
) => {
  const response = await api.put(
    `/requests/${id}`,
    {
      status,
    }
  );

  return response.data;
};

export const uploadDocumentApi = async (
  payload: {
    requestId: string;
    documentType: string;
    fileName: string;
  }
) => {
  const response =
    await api.post(
      "/requests/upload",
      payload
    );

  return response.data;
};

