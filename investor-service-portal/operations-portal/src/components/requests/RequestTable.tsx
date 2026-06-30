import type { ServiceRequest } from "../../types/request";
import RequestRow from "./RequestRow";

interface Props {
  requests: ServiceRequest[];
}

function RequestTable({ requests }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-3 text-left">
              Request ID
            </th>

            <th className="px-6 py-3 text-left">
              Request Type
            </th>

            <th className="px-6 py-3 text-left">
              Status
            </th>

            <th className="px-6 py-3 text-left">
              Created
            </th>

            <th className="px-6 py-3 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {requests.map((request) => (
            <RequestRow
              key={request.requestId}
              request={request}
            />
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default RequestTable;