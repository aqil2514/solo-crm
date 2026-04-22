"use client";

import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { data } = useAuth();
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
        {/* Ikon-ikon Aksi dengan warna Slate 500 (Professional Gray) */}
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
            {/* Badge warna Red-Accent (#ff4d4f) */}
            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#ff4d4f] text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              8
            </span>
          </Button>
        </div>

        {/* User Profile dengan Border Slate Halus */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-slate-700 leading-none">
              John
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Administrator</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:ring-4 hover:ring-slate-50 transition-all">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="User"
              className="w-full h-full object-cover bg-slate-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
