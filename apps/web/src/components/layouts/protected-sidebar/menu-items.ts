import { LayoutDashboard, Users, Settings, LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  id: string;
  labelKey: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: "dashboard",
    labelKey: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "customers",
    labelKey: "customers",
    href: "/customers",
    icon: Users,
  },
  {
    id: "settings",
    labelKey: "settings",
    href: "/settings",
    icon: Settings,
  },
];
