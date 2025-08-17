"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/rolecall-logo-blue.png";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { SidebarOptions } from "@/constants/SidebarOptions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/provider";

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar className="bg-secondary border-r border-border">
      <SidebarHeader className="p-4 space-y-4">
        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <div className="p-2 bg-background border border-border rounded-lg">
            <Image
              src={logo}
              alt="RoleCall Logo"
              width={160}
              height={80}
              className="w-[160px] h-[80px] object-contain"
            />
          </div>
        </div>
        
        {/* Create Interview Button */}
        <Link href="/dashboard/create-interview" className="w-full">
          <Button className="w-full h-11 gap-2 cursor-pointer shadow-sm">
            <Plus className="h-4 w-4" />
            Create New Interview
          </Button>
        </Link>
        
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {SidebarOptions.map((option, index) => {
              const isActive = pathname === option.path;
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    asChild 
                    className={
                      isActive
                        ? "h-11 px-3 rounded-lg bg-primary text-primary-foreground shadow-sm border border-primary/20 cursor-default hover:bg-primary hover:text-primary-foreground hover:border-primary/20 hover:shadow-sm"
                        : "h-11 px-3 rounded-lg transition-all duration-200 group hover:bg-background hover:border border-transparent hover:border-border hover:shadow-sm cursor-pointer"
                    }
                  >
                    <Link 
                      href={isActive ? "#" : option.path} 
                      className="flex items-center gap-3"
                      onClick={(e) => isActive && e.preventDefault()}
                    >
                      <div className={
                        isActive 
                          ? "p-1.5 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-transparent" 
                          : "p-1.5 rounded-md transition-colors bg-background border border-border group-hover:border-primary/20"
                      }>
                        <option.icon className={`
                          h-4 w-4 transition-colors
                          ${isActive ? "text-primary-foreground" : "text-primary"}
                        `} />
                      </div>
                      <span className={`
                        font-medium transition-colors
                        ${isActive ? "text-primary-foreground" : "text-foreground"}
                      `}>
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        
        {/* User Credits Display */}
        <div className="bg-background border border-border rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name?.split(' ')[0] || 'User'}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.credits || 0} credits available
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
