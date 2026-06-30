import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Requests from "../pages/Requests/Requests";
import RequestDetails from "../pages/Requests/RequestDetails";
import SLADashboard from "../pages/SLA/SLADashboard";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/requests" element={<Requests />} />

        {/* NEW ROUTE */}
        <Route
          path="/requests/:id"
          element={<RequestDetails />}
        />

       <Route
  path="/sla"
  element={
    <RoleProtectedRoute
      allowedRoles={["ADMIN", "MANAGER"]}
    >
      <SLADashboard />
    </RoleProtectedRoute>
  }
/>

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Always keep this LAST */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}

export default AppRoutes;