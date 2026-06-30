import { Link } from "react-router-dom";
import type { ServiceRequest } from "../../types/request";
import StatusBadge from "./StatusBadge";

interface Props {
  request: ServiceRequest;
}

function RequestRow({ request }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">
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

      <td className="px-6 py-4">
        <Link
          to={`/requests/${request.requestId}`}
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default RequestRow;