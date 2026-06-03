"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home",    href: "#home" },
  { label: "Games",   href: "#games" },
  { label: "Gallery", href: "#gallery" },
  { label: "Find Us", href: "#find-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 will-change-transform transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[#060a0e] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-200 animate-pulse-glow">
              SX
            </span>
            <span className="text-xl font-bold tracking-wide font-display">
              Snook<span className="text-amber-400">X</span>
            </span>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="relative text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200
                  after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0
                  after:bg-amber-400 after:transition-all after:duration-200 hover:after:w-full"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-1 px-5 py-2 rounded-full bg-felt hover:bg-felt-light text-white text-sm font-semibold
                transition-all duration-200 hover:shadow-lg hover:shadow-green-900/50 hover:scale-105"
            >
              Book Now
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col justify-between w-5 h-[18px]">
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[10px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96" : "max-h-0"
        } bg-[#060a0e]/98 backdrop-blur-md border-t border-[#1e3048]`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-4 text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-3 text-center rounded-full bg-felt hover:bg-felt-light text-white font-semibold transition-colors duration-200"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
