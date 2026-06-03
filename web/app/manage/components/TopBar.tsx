"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";
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
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border bg-card/80 backdrop-blur-sm flex-shrink-0">

      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden text-muted-foreground"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-lg font-bold text-foreground">{title}</h1>
      </div>

      {/* Right: live indicator + theme toggle + role badge */}
      <div className="flex items-center gap-2">
        {/* Live */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-5 mx-1" />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Role chip */}
        <Badge variant={role === "OWNER" ? "warning" : "success"} className="text-xs">
          {role}
        </Badge>
      </div>
    </header>
  );
}
