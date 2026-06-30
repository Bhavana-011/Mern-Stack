import { useState, useContext } from "react";
import type { RequestStatus } from "../../types/request";

import { AuthContext } from "../../context/AuthContext";
import { permissions } from "../../utils/permissions";

interface Props {
  currentStatus: RequestStatus;
  onUpdate: (status: RequestStatus) => Promise<void>;
}

function UpdateStatus({
  currentStatus,
  onUpdate,
}: Props) {
  const auth = useContext(AuthContext);

  const [status, setStatus] =
    useState<RequestStatus>(currentStatus);

  const [loading, setLoading] =
    useState(false);

  if (!auth) {
    return null;
  }

  if (
    !permissions.canUpdateStatus(auth.role)
  ) {
    return null;
  }

  async function handleUpdate() {
    try {
      setLoading(true);

      await onUpdate(status);

      alert("Status updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Update Status
      </h2>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as RequestStatus
          )
        }
        className="w-full rounded-lg border px-4 py-2"
      >
        <option value="PENDING">
          Pending
        </option>

        <option value="IN_PROGRESS">
          In Progress
        </option>

        <option value="RESOLVED">
          Resolved
        </option>

        <option value="REJECTED">
          Rejected
        </option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Updating..."
          : "Update Status"}
      </button>
    </div>
  );
}

export default UpdateStatus;