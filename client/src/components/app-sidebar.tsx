import * as React from "react";
import {
  Bookmark,
  BookOpen,
  BookOpenTextIcon,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // This is sample data.
  const data = {
    user: {
      name: "elchanan",
      email: "elchanan@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "your blogs",
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
        name: "add blog",
        url: "/addBlog",
        icon: BookOpenTextIcon,
      },
      {
        name: "contect us",
        url: "/contact",
        icon: PhoneCallIcon,
      },
      {
        name: "log in",
        url: "/auth/logIn",
        icon: PhoneCallIcon,
      },
      {
        name: "sign up",
        url: "/auth/signUp",
        icon: PhoneCallIcon,
      },
    ],
  };
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
