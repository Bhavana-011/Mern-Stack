import { useEffect, useMemo, useState } from "react";

import { requestService } from "../../services/requestService";
import type { ServiceRequest } from "../../types/request";

import RequestTable from "../../components/requests/RequestTable";
import SearchBar from "../../components/requests/SearchBar";
import RequestFilters from "../../components/requests/RequestFilters";

function Requests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await requestService.getAllRequests();
        setRequests(response.requests);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch = request.requestId
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "" || request.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, status]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Requests...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Requests
        </h1>

        <p className="text-gray-500">
          View and manage investor service requests.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <RequestFilters
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      {/* Table */}
      <RequestTable requests={filteredRequests} />
    </div>
  );
}

export default Requests;