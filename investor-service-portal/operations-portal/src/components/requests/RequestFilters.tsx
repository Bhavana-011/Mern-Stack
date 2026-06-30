interface RequestFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
}

function RequestFilters({
  status,
  onStatusChange,
}: RequestFiltersProps) {
  return (
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
    >
      <option value="">All Status</option>
      <option value="PENDING">Pending</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="RESOLVED">Resolved</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
}

export default RequestFilters;