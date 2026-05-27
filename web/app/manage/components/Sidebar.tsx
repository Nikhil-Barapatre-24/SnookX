"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransition } from "react";
import { logoutAction } from "../lib/actions";
import type { UserRole } from "../lib/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  ownerOnly?: boolean;
}

const NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/manage/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
  },
  {
    label: "Tables",
    href: "/manage/tables",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: "Finance",
    href: "/manage/finance",
    ownerOnly: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/manage/settings",
    ownerOnly: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
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
      className={`
        fixed inset-y-0 left-0 z-30 w-64 flex flex-col
        bg-[#060a0e] border-r border-[#1e3048]
        transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-[#1e3048] flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-sm shadow animate-pulse-glow">
          SX
        </div>
        <div>
          <p className="font-display text-base font-bold text-slate-100 leading-none">
            Snook<span className="text-amber-400">X</span>
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5 tracking-wide">Management</p>
        </div>
        {/* Close on mobile */}
        <button
          onClick={onClose}
          className="ml-auto lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          aria-label="Close sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-slate-600">
          Main Menu
        </p>
        {visibleNav.map(({ label, href, icon }) => {
          const isActive =
            href === "/manage/dashboard"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 group
                ${
                  isActive
                    ? "bg-green-900/30 text-green-400 border border-green-800/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }
              `}
            >
              <span className={`flex-shrink-0 transition-colors ${isActive ? "text-green-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                {icon}
              </span>
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"/>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Role badge + logout ── */}
      <div className="px-3 py-4 border-t border-[#1e3048] space-y-2 flex-shrink-0">
        {/* Role */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1e3048] flex items-center justify-center text-slate-400 text-xs font-bold flex-shrink-0">
            {role[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">Logged in as</p>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide mt-0.5 ${
              role === "OWNER"
                ? "bg-amber-900/40 text-amber-400 border border-amber-800/40"
                : "bg-green-900/40 text-green-400 border border-green-800/40"
            }`}>
              {role}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          disabled={pending}
          onClick={() => startTransition(() => logoutAction())}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 hover:text-red-400 hover:bg-red-950/30
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          {pending ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
