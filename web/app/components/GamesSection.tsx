type Game = {
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  glow: string;
};

const GAMES: Game[] = [
  {
    emoji: "🎱",
    title: "Snooker",
    tagline: "The Classic",
    description:
      "The pinnacle of cue sports. Played on a full-size 12ft table with 22 balls, snooker demands strategic thinking and pinpoint accuracy.",
    features: ["Full-size 12ft tables", "Professional cloth", "Scoreboard", "Coaching available"],
    gradient: "from-green-900/60 to-[#060a0e]",
    glow: "rgba(21,128,61,0.25)",
  },
  {
    emoji: "🟡",
    title: "English Pool",
    tagline: "8-Ball Action",
    description:
      "Fast-paced 8-ball pool on 7ft tables. Perfect for casual play or competitive leagues — solid colours vs. stripes.",
    features: ["7ft tables", "Red & yellow balls", "League play", "Free coaching tips"],
    gradient: "from-amber-900/50 to-[#060a0e]",
    glow: "rgba(217,119,6,0.25)",
  },
  {
    emoji: "🔵",
    title: "American Pool",
    tagline: "9-Ball & 10-Ball",
    description:
      "Experience the speed and skill of American pool formats. Multiple variations available on our bar-box and full-size tables.",
    features: ["9-ball format", "10-ball format", "Bar-box tables", "Tournament setup"],
    gradient: "from-blue-900/50 to-[#060a0e]",
    glow: "rgba(37,99,235,0.22)",
  },
  {
    emoji: "⚪",
    title: "Billiards",
    tagline: "The Original",
    description:
      "Three-ball carom billiards on a pocketless table — the purest test of cue control, positional play, and patience.",
    features: ["Pocketless tables", "3-ball carom", "Great for beginners", "Expert trainers"],
    gradient: "from-slate-800/60 to-[#060a0e]",
    glow: "rgba(100,116,139,0.22)",
  },
];

export default function GamesSection() {
  return (
    <section id="games" className="py-24 lg:py-32 bg-[#060a0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-green-900/30 text-green-400 border border-green-800/40">
            What We Offer
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Our <span className="gradient-text">Games</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            From the elegance of snooker to the fast break of pool — we have the
            perfect table for every player.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAMES.map((game) => (
            <article
              key={game.title}
              className="group relative rounded-2xl border border-[#1e3048] bg-[#0d1520] overflow-hidden
                hover:border-[#2e4a68] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{ "--glow": game.glow } as React.CSSProperties}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Glow blob */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: game.glow }}
              />

              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Icon + tagline */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl">{game.emoji}</span>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 group-hover:text-amber-400/70 transition-colors">
                    {game.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-slate-100 mb-3 group-hover:text-white">
                  {game.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {game.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-1.5">
                  {game.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-felt flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Divider + CTA */}
                <div className="mt-6 pt-4 border-t border-[#1e3048]">
                  <a
                    href="#contact"
                    className="text-sm font-medium text-felt-light hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    Book this table
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
