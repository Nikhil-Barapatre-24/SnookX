"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import {
  LayoutDashboard,
  Table2,
  BadgeDollarSign,
  Settings,
  LogOut,
} from "lucide-react";
import { logoutAction } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { UserRole } from "../lib/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  ownerOnly?: boolean;
}

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/manage/dashboard", icon: LayoutDashboard },
  { label: "Tables",    href: "/manage/tables",    icon: Table2 },
  { label: "Finance",   href: "/manage/finance",   icon: BadgeDollarSign, ownerOnly: true },
  { label: "Settings",  href: "/manage/settings",  icon: Settings,        ownerOnly: true },
];

interface Props {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: Props) {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const visibleNav = NAV.filter((item) => !item.ownerOnly || role === "OWNER");

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 flex flex-col",
        "bg-sidebar border-r border-sidebar-border",
        "transition-transform duration-300 ease-in-out",
        "lg:relative lg:translate-x-0 lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-sm shadow animate-pulse-glow flex-shrink-0">
          SX
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-bold text-sidebar-foreground leading-none">
            Snook<span className="text-amber-400">X</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wide">Management</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="ml-auto lg:hidden h-8 w-8 text-muted-foreground"
          aria-label="Close sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
          Main Menu
        </p>
        {visibleNav.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/manage/dashboard"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-accent text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: role + logout */}
      <div className="flex-shrink-0">
        <Separator className="bg-sidebar-border" />
        <div className="px-3 py-4 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs font-bold">
                {role[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">Logged in as</p>
              <Badge
                variant={role === "OWNER" ? "warning" : "success"}
                className="mt-0.5 text-[10px] tracking-wide"
              >
                {role}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            disabled={pending}
            onClick={() => startTransition(() => logoutAction())}
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {pending ? "Signing out…" : "Sign Out"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
