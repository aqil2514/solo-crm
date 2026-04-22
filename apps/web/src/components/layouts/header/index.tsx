"use client";

import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UserHeader } from "@/@types/auth";
import Image from "next/image"; // Import Image Next.js

export function Header() {
  // Destrukturisasi 'data' sebagai 'user'
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-header"],
    queryFn: async () => {
      const { data } = await api.get<UserHeader>("auth/user");
      return data;
    },
  });

  return (
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Area: Sidebar Trigger */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all rounded-lg"
        >
          <Menu size={20} strokeWidth={1.5} />
        </Button>
      </div>

      {/* Right Area: Actions & Profile */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 pr-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Search size={19} strokeWidth={1.5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <HelpCircle size={19} strokeWidth={1.5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors relative"
          >
            <Bell size={19} strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#ff4d4f] text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              8
            </span>
          </Button>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            {isLoading ? (
              // Skeleton sederhana saat loading
              <div className="space-y-2">
                <div className="h-3 w-16 bg-slate-100 animate-pulse rounded" />
                <div className="h-2 w-20 bg-slate-50 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <p className="text-[13px] font-semibold text-slate-700 leading-none capitalize">
                  {user?.name || "Guest"}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 capitalize">
                  {user?.role || "User"}
                </p>
              </>
            )}
          </div>

          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:ring-4 hover:ring-slate-50 transition-all">
            {isLoading ? (
              <div className="w-full h-full bg-slate-100 animate-pulse" />
            ) : (
              <Image
                src={
                  user?.picture ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || "Guest"}`
                }
                alt={user?.name || "User Profile"}
                fill
                className="object-cover bg-slate-100"
                sizes="32px"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
