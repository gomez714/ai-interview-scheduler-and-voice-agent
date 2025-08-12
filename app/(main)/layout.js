import React from "react";
import DashboardProvider from "./provider";

function DashboardLayout({ children }) {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <DashboardProvider>
       <div className="">
       {children}

       </div>
        </DashboardProvider>
    </div>
  );
}

export default DashboardLayout;
