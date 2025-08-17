import React from "react";
import DashboardProvider from "./provider";
import AuthProvider from "./AuthProvider";

function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <DashboardProvider>
        <div className="">
          {children}
        </div>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default DashboardLayout;
