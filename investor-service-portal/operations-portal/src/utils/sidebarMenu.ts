import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartLine,
  FaUserCircle,
 
} from "react-icons/fa";

export interface SidebarMenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ("ADMIN" | "MANAGER" | "EXECUTIVE")[];
}

export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
    roles: ["ADMIN", "MANAGER", "EXECUTIVE"],
  },
  {
    title: "Requests",
    path: "/requests",
    icon: FaClipboardList,
    roles: ["ADMIN", "MANAGER", "EXECUTIVE"],
  },
  {
    title: "SLA Dashboard",
    path: "/sla",
    icon: FaChartLine,
    roles: ["ADMIN", "MANAGER"],
  },
  
  {
    title: "Profile",
    path: "/profile",
    icon: FaUserCircle,
    roles: ["ADMIN", "MANAGER", "EXECUTIVE"],
  },
];