"use client";

import CountUp from "./CountUp";

const STATS = [
  { end: 12, suffix: "+", label: "Premium Tables" },
  { end: 5,  suffix: "★", label: "Customer Rating" },
  { end: 10, suffix: "+", label: "Years of Excellence" },
];

/* ── Snooker-ball decorations ── */
const BALLS = [
  { color: "#ef4444", shadow: "#7f1d1d", top: "12%",  right: "8%",   size: 56,  delay: "0s",    blur: "blur-[2px]" },
  { color: "#fbbf24", shadow: "#92400e", bottom: "18%", left: "6%",  size: 40,  delay: "1.1s",  blur: "blur-[2px]" },
  { color: "#60a5fa", shadow: "#1e3a8a", top: "55%",   left: "4%",   size: 30,  delay: "2.2s",  blur: "blur-[2px]" },
  { color: "#f472b6", shadow: "#831843", bottom: "30%", right: "5%", size: 26,  delay: "0.7s",  blur: "blur-[1px]" },
  { color: "#a78bfa", shadow: "#4c1d95", top: "28%",   left: "10%",  size: 20,  delay: "1.8s",  blur: "blur-[1px]" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden felt-pattern"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large ambient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(21,128,61,0.12) 0%, transparent 70%)" }} />
        {/* Top-right accent */}
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 65%)" }} />
        {/* Animated snooker balls */}
        {BALLS.map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${b.blur}`}
            style={{
              width: b.size, height: b.size,
              top: b.top, bottom: b.bottom,
              left: b.left, right: b.right,
              background: `radial-gradient(circle at 35% 30%, ${b.color}, ${b.shadow})`,
              opacity: 0.25,
              animationDelay: b.delay,
            }}
          />
        ))}
        {/* Spinning ring decoration */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-felt/10 animate-spin-slow hidden lg:block" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-amber-400/8 animate-spin-slow hidden lg:block"
          style={{ animationDirection: "reverse", animationDuration: "14s" }} />
        {/* Edge fades */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#060a0e] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#060a0e] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen lg:min-h-0 lg:py-32">

          {/* Left column */}
          <div className="animate-fade-in-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-green-700/40 bg-green-900/15 text-green-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Now Open · Premium Tables Available
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[5rem] font-bold leading-[1.05] mb-6">
              <span className="block text-slate-100">Master the</span>
              <span className="block gradient-text">Perfect Break</span>
              <span className="block text-slate-100 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] mt-1">at SnookX</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              Where precision meets passion. Professional-grade tables, expert
              coaches, and an atmosphere built for serious players and casual
              enthusiasts alike.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                  bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold text-base
                  transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/60 hover:scale-105
                  overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Table
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {/* Shimmer on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                  border border-slate-600 hover:border-amber-400/50
                  text-slate-300 hover:text-amber-400 font-semibold text-base
                  transition-all duration-300 hover:bg-amber-400/5"
              >
                View Gallery
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 sm:gap-12 flex-wrap">
              {STATS.map(({ end, suffix, label }, i) => (
                <div key={label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-0.5">
                    <CountUp end={end} suffix={suffix} />
                  </div>
                  <div className="text-xs text-slate-500 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — CSS snooker table art */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-right">
            <div className="relative w-[420px] h-[420px]">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border border-felt/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-amber-400/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s" }} />

              {/* Snooker table surface */}
              <div className="absolute inset-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
                style={{ background: "linear-gradient(135deg, #14532d 0%, #15803d 40%, #166534 100%)" }}>
                {/* Cushion edges */}
                <div className="absolute inset-0 border-[12px] border-[#0f3d1e] rounded-2xl" />
                {/* Baulk line */}
                <div className="absolute left-[30%] top-[10%] bottom-[10%] w-px bg-white/20" />
                {/* D semicircle */}
                <div className="absolute left-[28%] top-1/2 -translate-y-1/2 w-14 h-24 border-r-2 border-white/20 rounded-r-full" />
                {/* Pockets — corners + midpoints */}
                {[
                  "top-[5%] left-[5%]","top-[5%] right-[5%]",
                  "bottom-[5%] left-[5%]","bottom-[5%] right-[5%]",
                  "top-[47%] left-[-1%]","top-[47%] right-[-1%]",
                ].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5 rounded-full bg-[#060a0e] shadow-inner`} />
                ))}
                {/* Pink ball */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                  style={{ background: "radial-gradient(circle at 35% 30%, #f9a8d4, #be185d)" }} />
                {/* Red balls — triangle */}
                {[
                  { top: "42%", left: "62%" },{ top: "38%", left: "66%" },{ top: "46%", left: "66%" },
                  { top: "34%", left: "70%" },{ top: "42%", left: "70%" },{ top: "50%", left: "70%" },
                ].map((pos, i) => (
                  <div key={i} className="absolute w-3.5 h-3.5 rounded-full"
                    style={{ top: pos.top, left: pos.left, background: "radial-gradient(circle at 35% 30%, #fca5a5, #b91c1c)" }} />
                ))}
                {/* Cue ball */}
                <div className="absolute top-1/2 left-[22%] -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{ background: "radial-gradient(circle at 35% 30%, #fff, #cbd5e1)" }} />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -top-2 -right-4 bg-[#0d1520] border border-[#1e3048] rounded-2xl px-5 py-3 shadow-xl animate-float"
                style={{ animationDelay: "0.5s" }}>
                <div className="text-2xl font-bold gradient-text">12+</div>
                <div className="text-xs text-slate-500 mt-0.5">Tables</div>
              </div>
              <div className="absolute -bottom-4 -left-6 bg-[#0d1520] border border-[#1e3048] rounded-2xl px-5 py-3 shadow-xl animate-float"
                style={{ animationDelay: "1.4s" }}>
                <div className="text-2xl font-bold text-amber-400">5★</div>
                <div className="text-xs text-slate-500 mt-0.5">Rated</div>
              </div>
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-[#0d1520] border border-felt/30 rounded-2xl px-4 py-2.5 shadow-xl animate-float"
                style={{ animationDelay: "2.1s" }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">Open Now</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 animate-bounce" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.15em]">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
