import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";

import { sidebarMenu } from "../../utils/sidebarMenu";
import { AuthContext } from "../../context/AuthContext";
import { authService } from "../../services/authService";

function Sidebar() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  function handleLogout() {
    authService.logout();
    window.location.href = "/";
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-800">
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-white">
          Operations Portal
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Investor Service
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {sidebarMenu
          .filter((item) =>
            item.roles.includes(auth.role ?? "")
          )
          .map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={menuClass}
              >
                <Icon className="text-lg" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;