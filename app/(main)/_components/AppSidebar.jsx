"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/rolecall-logo-blue.png";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarOptions } from "@/constants/SidebarOptions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={100}
          className="w-[200px] h-[100px] object-contain"
        />
        <Button className="w-full">
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`p-5 ${pathname === option.path && "bg-blue-50"}`} >
                    <Link href={option.path}>
                      <option.icon className={`${pathname === option.path && "text-primary"}`}/>
                      <span className={`text-lg font-medium ${pathname === option.path && "text-primary"}`} >{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
