import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import RecentRequests from "../../components/dashboard/RecentRequests";

import { requestService } from "../../services/requestService";

import type { SLAResponse } from "../../types/request";

function Dashboard() {
  const [slaData, setSlaData] = useState<SLAResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await requestService.getSLADashboard();
        setSlaData(response);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Investor Service Request Management
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="On Track"
          value={slaData?.summary.onTrack ?? 0}
          color="bg-green-600"
        />

        <StatCard
          title="Warning"
          value={slaData?.summary.warning ?? 0}
          color="bg-yellow-500"
        />

        <StatCard
          title="Breached"
          value={slaData?.summary.breached ?? 0}
          color="bg-red-600"
        />

        <StatCard
          title="Resolved"
          value={slaData?.summary.resolved ?? 0}
          color="bg-blue-600"
        />
      </div>

      {/* SLA Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-slate-700">
            SLA Compliance
          </h2>

          <p className="mt-4 text-4xl font-bold text-green-600">
            {slaData?.compliance ?? 0}%
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-slate-700">
            Average Resolution Time
          </h2>

          <p className="mt-4 text-4xl font-bold text-blue-600">
            {slaData?.avgTime ?? 0} hrs
          </p>
        </div>
      </div>

      {/* Recent Requests */}
      <RecentRequests />
    </div>
  );
}

export default Dashboard;