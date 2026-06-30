import { useEffect, useState } from "react";

import { requestService } from "../../services/requestService";
import type { ServiceRequest } from "../../types/request";

import StatusBadge from "../requests/StatusBadge";

function RecentRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await requestService.getAllRequests();
        setRequests(response.requests.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold">
          Recent Requests
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Request ID</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr
              key={request.requestId}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                {request.requestId}
              </td>

              <td className="px-6 py-4">
                {request.requestType}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={request.status} />
              </td>

              <td className="px-6 py-4">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentRequests;