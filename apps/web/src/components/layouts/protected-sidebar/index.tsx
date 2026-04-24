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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SIDEBAR_MENU_ITEMS } from "./menu-items";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ChevronRight } from "lucide-react"; // Import icon untuk indikator dropdown

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
            {SIDEBAR_MENU_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (!hasChildren) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
                      <Link href={item.href} className="flex items-center gap-3 py-5">
                        <item.icon className="w-5 h-5 opacity-70" />
                        <span className="font-medium">{t(item.labelKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={item.id}
                  asChild
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={t(item.labelKey)}>
                        <item.icon className="w-5 h-5 opacity-70" />
                        <span className="font-medium">{t(item.labelKey)}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((child) => (
                          <SidebarMenuSubItem key={child.id}>
                            <SidebarMenuSubButton asChild>
                              <Link href={child.href}>
                                <span>{t(child.labelKey)}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <LanguageSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}