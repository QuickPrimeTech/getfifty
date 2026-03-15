"use client";
import * as React from "react";
import { NavMain } from "@/layouts/nav-main";
import { NavSecondary } from "@/layouts/nav-secondary";
import { NavUser } from "@/layouts/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  CircleHelpIcon,
  Settings,
  Home,
  Link2,
  ArrowUpDown,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "My Link",
      url: "/dashboard/link",
      icon: <Link2 />,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: <ArrowUpDown />,
    },
    {
      title: "Referrals",
      url: "/dashboard/referrals",
      icon: <Users />,
    },
    {
      title: "Withdraw",
      url: "/dashboard/withdraw",
      icon: <Wallet />,
    },
  ],

  navSecondary: [
    {
      title: "Back to Website",
      url: "/",
      icon: <Home />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: <CircleHelpIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="#" />}
            >
              <Logo className="size-6!" />
              <span className="text-base font-sans font-semibold">
                GetFifty.
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
