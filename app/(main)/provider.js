import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { Menu } from "lucide-react";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-4 md:p-10">
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between">
            <SidebarTrigger className="h-10 w-10 bg-secondary border border-border rounded-lg shadow-sm hover:bg-background hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <Menu className="h-5 w-5 text-foreground" />
            </SidebarTrigger>
            <div className="text-right">
              <h1 className="text-lg font-semibold text-foreground">RoleCall</h1>
              <p className="text-xs text-muted-foreground">AI Interviews</p>
            </div>
          </div>
        </div>
        
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
