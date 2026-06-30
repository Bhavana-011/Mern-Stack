import { useState } from "react";

interface Props {
  requests: any[];
  setFilteredRequests: React.Dispatch<
    React.SetStateAction<any[]>
  >;
}

export default function SLAFilters({
  requests,
  setFilteredRequests,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  function applyFilters(
    searchValue: string,
    statusValue: string,
    priorityValue: string
  ) {
    let filtered = [...requests];

    if (searchValue) {
      filtered = filtered.filter((request) =>
        request.requestId
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    if (statusValue !== "ALL") {
      filtered = filtered.filter(
        (request) => request.status === statusValue
      );
    }

    if (priorityValue !== "ALL") {
      filtered = filtered.filter(
        (request) => request.priority === priorityValue
      );
    }

    setFilteredRequests(filtered);
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      <input
        type="text"
        placeholder="Search Request ID..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          applyFilters(
            e.target.value,
            status,
            priority
          );
        }}
        className="rounded-lg border p-3"
      />

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          applyFilters(
            search,
            e.target.value,
            priority
          );
        }}
        className="rounded-lg border p-3"
      >
        <option value="ALL">All Status</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">
          In Progress
        </option>
        <option value="RESOLVED">
          Resolved
        </option>
      </select>

      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          applyFilters(
            search,
            status,
            e.target.value
          );
        }}
        className="rounded-lg border p-3"
      >
        <option value="ALL">All Priority</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

    </div>
  );
}