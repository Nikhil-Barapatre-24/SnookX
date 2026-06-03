const ITEMS = [
  "🎱 Premium Snooker Tables",
  "🏆 Professional Coaching",
  "⚡ Book in Seconds",
  "🟡 English Pool",
  "🔵 American Pool",
  "⚪ Carom Billiards",
  "✨ 5-Star Experience",
  "🎯 Tournament Ready",
  "🕐 Open Late",
  "🎱 Premium Snooker Tables",
  "🏆 Professional Coaching",
  "⚡ Book in Seconds",
  "🟡 English Pool",
  "🔵 American Pool",
  "⚪ Carom Billiards",
  "✨ 5-Star Experience",
  "🎯 Tournament Ready",
  "🕐 Open Late",
];

export default function MarqueeTicker() {
  return (
    <div className="relative overflow-hidden py-4 bg-felt/10 border-y border-felt/20">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060a0e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060a0e] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex whitespace-nowrap gap-0">
        {ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-sm font-medium text-slate-400">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-felt/60 inline-block ml-6" />
          </span>
        ))}
      </div>
    </div>
  );
}
