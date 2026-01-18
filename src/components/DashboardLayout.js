import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/DashboardLayout.css";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-root">
      <Sidebar collapsed={collapsed} />

      <div
        className="dashboard-main"
        style={{
          marginLeft: collapsed ? "90px" : "260px",
          transition: "margin-left 0.3s",
        }}
      >
        <Header onToggle={() => setCollapsed(!collapsed)} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
