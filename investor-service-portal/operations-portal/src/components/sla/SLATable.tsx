interface Props {
  requests: any[];
}

export default function SLATable({
  requests,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Request ID
            </th>

            <th className="p-3 text-left">
              Investor
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Priority
            </th>

          </tr>

        </thead>

        <tbody>

          {requests.map((request) => (

            <tr
              key={request._id}
              className="border-t"
            >

              <td className="p-3">
                {request.requestId}
              </td>

              <td className="p-3">
                {request.investorName}
              </td>

              <td className="p-3">
                {request.status}
              </td>

              <td className="p-3">
                {request.priority}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}