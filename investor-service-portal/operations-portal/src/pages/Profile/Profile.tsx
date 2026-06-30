import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaEnvelope,
  FaIdBadge,
  FaBuilding,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    return null;
  }

  function logout() {
    auth.logout();
    navigate("/");
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500">
          Operations Portal User Information
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl bg-white p-8 shadow">

        <div className="flex items-center gap-6">

          <FaUserCircle
            className="text-blue-600"
            size={90}
          />

          <div>
            <h2 className="text-2xl font-bold">
              Operations User
            </h2>

            <p className="text-gray-500">
              Investor Service Portal
            </p>
          </div>

        </div>

        {/* User Details */}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="flex items-center gap-3">

            <FaEnvelope className="text-gray-500" />

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p>Logged In User</p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <FaIdBadge className="text-gray-500" />

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="font-medium">
                {auth.role}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <FaBuilding className="text-gray-500" />

            <div>
              <p className="text-sm text-gray-500">
                Department
              </p>

              <p>Investor Services</p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <FaIdBadge className="text-gray-500" />

            <div>
              <p className="text-sm text-gray-500">
                User ID
              </p>

              <p>{auth.userId}</p>
            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-10 flex gap-4">

          <button
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}