import { useEffect, useState } from "react";

import { requestService } from "../../services/requestService";

import SLACards from "../../components/sla/SLACards";
import SLAFilters from "../../components/sla/SLAFilters";
import SLATable from "../../components/sla/SLATable";

export default function SLADashboard() {
  const [summary, setSummary] = useState<any>(null);

  const [requests, setRequests] = useState<any[]>([]);

  const [filteredRequests, setFilteredRequests] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  // Load Dashboard Data
  const loadData = async () => {
    try {
      const slaResponse =
        await requestService.getSLADashboard();

      const requestResponse =
        await requestService.getAllRequests();

      setSummary(slaResponse);

      setRequests(requestResponse.requests);

      setFilteredRequests(
        requestResponse.requests
      );
    } catch (error) {
      console.error("SLA Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">
          Loading SLA Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">
          SLA Dashboard
        </h1>

        <p className="text-gray-500">
          Monitor Service Level Agreement performance.
        </p>
      </div>

      {/* Summary Cards */}
      <SLACards summary={summary} />

      {/* Filters */}
      <SLAFilters
        requests={requests}
        setFilteredRequests={setFilteredRequests}
      />

      {/* Table */}
      <SLATable
        requests={filteredRequests}
      />
    </div>
  );
}