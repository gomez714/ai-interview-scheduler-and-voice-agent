import React from "react";
import DashboardProvider from "./provider";

function DashboardLayout({ children }) {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <DashboardProvider>{children}</DashboardProvider>
    </div>
  );
}

export default DashboardLayout;
