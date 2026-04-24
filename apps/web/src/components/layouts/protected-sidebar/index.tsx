"use client";

import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { SIDEBAR_MENU_ITEMS } from "./menu-items";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

export function ProtectedSidebar() {
  const t = useTranslations("sidebar");

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-zinc-950">
      <SidebarHeader className="h-16 flex items-center justify-start border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold text-sm">
            S
          </div>
          <h2 className="text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            Solo CRM
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("main_menu")}</SidebarGroupLabel>
          <SidebarMenu>
            {SIDEBAR_MENU_ITEMS.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
                  <Link href={item.href} className="flex items-center gap-3 py-5">
                    <item.icon className="w-5 h-5 opacity-70" />
                    <span className="font-medium">{t(item.labelKey)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <LanguageSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}