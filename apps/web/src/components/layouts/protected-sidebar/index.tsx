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
import { Link, usePathname } from "@/i18n/navigation"; // Import usePathname
import { LanguageSwitcher } from "./language-switcher";
import { ChevronRight } from "lucide-react";

export function ProtectedSidebar() {
  const t = useTranslations("sidebar");
  const pathname = usePathname(); // Ambil path saat ini

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
              
              // Cek apakah path saat ini sama dengan href menu utama
              const isParentActive = pathname === item.href;
              
              // Cek apakah ada anak dari menu ini yang sedang aktif
              const isChildActive = item.children?.some((child) => pathname === child.href);

              if (!hasChildren) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={t(item.labelKey)}
                      isActive={isParentActive} // Shadcn Sidebar mendukung prop isActive
                    >
                      <Link href={item.href} className="flex items-center gap-3 py-5">
                        <item.icon className={`w-5 h-5 ${isParentActive ? "opacity-100" : "opacity-70"}`} />
                        <span className={isParentActive ? "font-bold" : "font-medium"}>
                          {t(item.labelKey)}
                        </span>
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
                  defaultOpen={isChildActive} // Buka otomatis jika ada anak yang aktif
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        tooltip={t(item.labelKey)}
                        isActive={isChildActive} // Tandai parent jika anaknya aktif
                      >
                        <item.icon className={`w-5 h-5 ${isChildActive ? "opacity-100" : "opacity-70"}`} />
                        <span className={isChildActive ? "font-bold" : "font-medium"}>
                          {t(item.labelKey)}
                        </span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((child) => {
                          const isSubActive = pathname === child.href;
                          return (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link href={child.href}>
                                  <span className={isSubActive ? "font-bold text-slate-500" : ""}>
                                    {t(child.labelKey)}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
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