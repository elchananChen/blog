import * as React from "react";
import {
  Bookmark,
  BookOpen,
  BookOpenTextIcon,
  CookingPotIcon,
  HomeIcon,
  PhoneCallIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-pagas";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "your recipes",
      url: "#",
      icon: BookOpen,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "saved",
      url: "#",
      icon: Bookmark,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
  pages: [
    {
      name: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      name: "blogs",
      url: "/blogs",
      icon: BookOpenTextIcon,
    },
    {
      name: "contect us",
      url: "/contact",
      icon: PhoneCallIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="group-data-[collapsible=icon]:hidden">
        FlavorFusion
      </SidebarHeader>
      <SidebarContent>
        <NavProjects pagas={data.pages} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle></ModeToggle>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}