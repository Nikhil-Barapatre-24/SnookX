"use client";

import { usePathname } from "next/navigation";
import type { UserRole } from "../lib/types";

const TITLES: Record<string, string> = {
  "/manage/dashboard": "Dashboard",
  "/manage/tables":    "Tables",
  "/manage/finance":   "Finance",
  "/manage/settings":  "Settings",
};

function getTitle(pathname: string): string {
  for (const [key, val] of Object.entries(TITLES)) {
    if (pathname === key || pathname.startsWith(key + "/")) return val;
  }
  return "SnookX";
}

interface Props {
  role: UserRole;
  onMenuToggle: () => void;
}

export default function TopBar({ role, onMenuToggle }: Props) {
  const pathname = usePathname();
  const title    = getTitle(pathname);

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-[#1e3048] bg-[#060a0e]/80 backdrop-blur-sm flex-shrink-0">

      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-colors"
          aria-label="Open navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 className="font-display text-lg font-bold text-slate-100">{title}</h1>
      </div>

      {/* Right: indicators + role badge */}
      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-900/20 border border-green-800/30 text-green-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          Live
        </div>

        {/* Role chip */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
          role === "OWNER"
            ? "bg-amber-900/20 border-amber-800/40 text-amber-400"
            : "bg-green-900/20 border-green-800/40 text-green-400"
        }`}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          {role}
        </div>
      </div>
    </header>
  );
}
