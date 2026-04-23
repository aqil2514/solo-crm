"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Building, LifeBuoy, LogOut, Monitor, Key } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserHeader } from "@/@types/auth";

interface UserDropdownProps {
  user?: UserHeader;
  isLoading: boolean;
}

export function UserDropdown({ user, isLoading }: UserDropdownProps) {
  const t = useTranslations("header");
  const tProfile = useTranslations("profile_dropdown");

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100">
        <div className="space-y-2 hidden sm:block text-right">
          <div className="h-3 w-16 bg-slate-100 animate-pulse rounded" />
          <div className="h-2 w-20 bg-slate-50 animate-pulse rounded" />
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-100 animate-pulse" />
      </div>
    );
  }

  const userDisplayName = user?.name || t("guest");
  const userAvatar =
    user?.picture ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${userDisplayName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100 cursor-pointer group hover:opacity-80 transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-slate-700 leading-none capitalize">
              {userDisplayName}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 capitalize">
              {user?.role || t("role")}
            </p>
          </div>
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 group-hover:ring-4 group-hover:ring-slate-50 transition-all">
            <Image
              src={userAvatar}
              alt={userDisplayName}
              fill
              className="object-cover bg-slate-100"
              sizes="32px"
            />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userDisplayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground lowercase">
              {user?.email || tProfile("email_placeholder")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup title={tProfile("personal")}>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{tProfile("my_profile")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Monitor className="mr-2 h-4 w-4" />
            <span>{tProfile("appearance")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup title={tProfile("business")}>
          <DropdownMenuItem className="cursor-pointer">
            <Building className="mr-2 h-4 w-4" />
            <span>{tProfile("workspace")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Key className="mr-2 h-4 w-4" />
            <span>{tProfile("api_keys")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>{tProfile("support")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{tProfile("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
