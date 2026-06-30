export type RequestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

export interface ServiceRequest {
  _id?: string;

  requestId: string;

  investorId: string;

  requestType: string;

  description: string;

  status: RequestStatus;

  requestData?: Record<string, unknown>;

  slaDeadline: string;

  createdAt: string;

  updatedAt: string;

  resolvedAt?: string;
}

export interface RequestsResponse {
  success: boolean;
  count: number;
  requests: ServiceRequest[];
}

export interface RequestResponse {
  success: boolean;
  request: ServiceRequest;
}

export interface SLASummary {
  onTrack: number;
  warning: number;
  breached: number;
  resolved: number;
}

export interface SLAResponse {
  success: boolean;

  summary: SLASummary;

  compliance: number;

  avgTime: number;
}

export interface UploadDocumentRequest {
  requestId: string;
  documentType: string;
  fileName: string;
}