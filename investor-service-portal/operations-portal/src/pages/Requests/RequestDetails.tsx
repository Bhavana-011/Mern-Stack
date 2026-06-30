import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { requestService } from "../../services/requestService";
import type {
  ServiceRequest,
  RequestStatus,
} from "../../types/request";

import StatusBadge from "../../components/requests/StatusBadge";
import UpdateStatus from "../../components/requests/UpdateStatus";

function RequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        if (!id) return;

        const response = await requestService.getRequest(id);
        setRequest(response.request);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  async function handleStatusUpdate(
    status: RequestStatus
  ) {
    if (!request) return;

    try {
      await requestService.updateStatus(
        request.requestId,
        status
      );

      setRequest({
        ...request,
        status,
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center text-red-500">
        Request not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold">
          Request Details
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-gray-500">Request ID</p>
            <p className="font-semibold">
              {request.requestId}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Request Type</p>
            <p className="font-semibold">
              {request.requestType}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <StatusBadge status={request.status} />
          </div>

          <div>
            <p className="text-gray-500">Investor ID</p>
            <p className="font-semibold">
              {request.investorId}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <p>
              {new Date(
                request.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              SLA Deadline
            </p>
            <p>
              {new Date(
                request.slaDeadline
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-gray-500">
            Description
          </p>

          <div className="rounded-lg border p-4">
            {request.description}
          </div>
        </div>
      </div>

      <UpdateStatus
        currentStatus={request.status}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
}

export default RequestDetails;