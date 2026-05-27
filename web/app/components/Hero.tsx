const STATS = [
  { value: "12+", label: "Premium Tables" },
  { value: "5★",  label: "Customer Rating" },
  { value: "10+", label: "Years of Excellence" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden felt-pattern"
    >
      {/* ── Decorative blobs & balls ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-green-900/20 blur-[120px]" />
        {/* Colored snooker balls as decorative blobs */}
        <div
          className="absolute top-[18%] right-[12%] w-24 h-24 rounded-full opacity-20 blur-md animate-float"
          style={{ background: "radial-gradient(circle at 35% 30%, #ef4444, #7f1d1d)" }}
        />
        <div
          className="absolute bottom-[22%] left-[9%] w-16 h-16 rounded-full opacity-20 blur-md animate-float"
          style={{ background: "radial-gradient(circle at 35% 30%, #fbbf24, #92400e)", animationDelay: "1.2s" }}
        />
        <div
          className="absolute top-[42%] left-[6%] w-12 h-12 rounded-full opacity-15 blur-md animate-float"
          style={{ background: "radial-gradient(circle at 35% 30%, #60a5fa, #1e3a8a)", animationDelay: "2.4s" }}
        />
        <div
          className="absolute bottom-[35%] right-[7%] w-10 h-10 rounded-full opacity-15 blur-sm animate-float"
          style={{ background: "radial-gradient(circle at 35% 30%, #f472b6, #831843)", animationDelay: "0.8s" }}
        />
        {/* Top / bottom edge fades */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#060a0e] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060a0e] to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in-up">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-green-700/40 bg-green-900/20 text-green-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now Open · Premium Tables Available
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-tight mb-6">
          <span className="block text-slate-100">Master the</span>
          <span className="block gradient-text">Perfect Break</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Step into <strong className="text-slate-200 font-semibold">SnookX</strong> — where precision
          meets passion. Professional-grade tables, expert coaches, and an
          atmosphere built for serious players.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-gradient-to-r from-green-700 to-green-600
              hover:from-green-600 hover:to-green-500
              text-white font-semibold text-base
              transition-all duration-300 hover:shadow-xl hover:shadow-green-900/50 hover:scale-105"
          >
            Book a Table
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              border border-slate-600 hover:border-amber-400/50
              text-slate-300 hover:text-amber-400
              font-semibold text-base
              transition-all duration-300 hover:bg-amber-400/5"
          >
            View Gallery
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="text-center">
              {i > 0 && (
                <div className="hidden sm:block absolute -left-8 top-1/2 -translate-y-1/2 w-px h-8 bg-[#1e3048]" />
              )}
              <div className="relative text-3xl sm:text-4xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs sm:text-sm text-slate-500 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.15em]">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
