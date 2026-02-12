import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  AppWindowIcon,
  ChevronUp,
  Home,
  LayersIcon,
  LibraryBig,
  MonitorCogIcon,
  NewspaperIcon,
  User2,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/public/assets/img/avatar.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "User", url: "/dashboard/user", icon: User2Icon },
  { title: "Blog", url: "/dashboard/blog", icon: NewspaperIcon },
  { title: "Services", url: "/dashboard/service", icon: MonitorCogIcon },
  { title: "Projects", url: "/dashboard/project", icon: AppWindowIcon },
  { title: "Experience", url: "/dashboard/experience", icon: LayersIcon },
  { title: "Profile", url: "/dashboard/expertise", icon: LibraryBig },
  // { title: "Settings", url: "#", icon: Settings },
];

const SideBar = () => {
  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Image
                  src={Avatar}
                  alt="User"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="ml-2 font-medium">Nayeb Raihan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge>50</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="">
                    <Projector /> See All Projects
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="">
                    <Plus /> Add Project
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* Collapsable Menu */}
        {/* <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Collapsable Menu
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="">
                        <Projector /> See All Projects
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="">
                        <Plus /> Add Project
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
      </SidebarContent>

      {/* FOOTER WITH DROPDOWN */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="h-4 w-4" />
                  <span>John Doe</span>
                  <ChevronUp className="ml-auto h-4 w-4 opacity-70" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 rounded-md shadow-md"
              >
                <DropdownMenuLabel className="font-semibold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
