import React from "react";
import DashboardProvider from "./provider";

function DashboardLayout({ children }) {
  return (
    <div>
      
      <DashboardProvider>
       <div className="">
       {children}

       </div>
        </DashboardProvider>
    </div>
  );
}

export default DashboardLayout;
