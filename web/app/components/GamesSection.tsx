import RevealOnScroll from "./RevealOnScroll";

type Game = {
  num: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  accentColor: string;
  glowColor: string;
  borderHover: string;
};

const GAMES: Game[] = [
  {
    num: "01",
    emoji: "🎱",
    title: "Snooker",
    tagline: "The Classic",
    description:
      "The pinnacle of cue sports. Played on a full-size 12ft table with 22 balls — snooker demands strategic thinking and pinpoint accuracy.",
    features: ["Full-size 12ft tables", "Professional cloth", "Scoreboard", "Coaching available"],
    accentColor: "text-green-400",
    glowColor: "rgba(21,128,61,0.3)",
    borderHover: "hover:border-green-600/40",
  },
  {
    num: "02",
    emoji: "🟡",
    title: "English Pool",
    tagline: "8-Ball Action",
    description:
      "Fast-paced 8-ball pool on 7ft tables. Perfect for casual play or competitive leagues — solid colours vs. stripes.",
    features: ["7ft tables", "Red & yellow balls", "League play", "Free coaching tips"],
    accentColor: "text-amber-400",
    glowColor: "rgba(217,119,6,0.3)",
    borderHover: "hover:border-amber-600/40",
  },
  {
    num: "03",
    emoji: "🔵",
    title: "American Pool",
    tagline: "9-Ball & 10-Ball",
    description:
      "Experience the speed and skill of American pool formats — multiple variations on bar-box and full-size tables.",
    features: ["9-ball format", "10-ball format", "Bar-box tables", "Tournament setup"],
    accentColor: "text-blue-400",
    glowColor: "rgba(37,99,235,0.25)",
    borderHover: "hover:border-blue-600/40",
  },
  {
    num: "04",
    emoji: "⚪",
    title: "Billiards",
    tagline: "The Original",
    description:
      "Three-ball carom billiards on a pocketless table — the purest test of cue control, positional play, and patience.",
    features: ["Pocketless tables", "3-ball carom", "Great for beginners", "Expert trainers"],
    accentColor: "text-slate-300",
    glowColor: "rgba(100,116,139,0.25)",
    borderHover: "hover:border-slate-500/40",
  },
];

export default function GamesSection() {
  return (
    <section id="games" className="py-24 lg:py-32 bg-[#060a0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <RevealOnScroll extraClass="text-center mb-16">
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
        </RevealOnScroll>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAMES.map((game, i) => (
            <RevealOnScroll key={game.title} delay={i * 100} extraClass="h-full">
              <article
                className={`group relative rounded-2xl border border-[#1e3048] ${game.borderHover} bg-[#0d1520] overflow-hidden
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col`}
                style={{ "--glow": game.glowColor } as React.CSSProperties}
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-5 font-display text-6xl font-bold text-white/[0.04] select-none leading-none pointer-events-none">
                  {game.num}
                </div>

                {/* Glow blob */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: game.glowColor }}
                />

                <div className="relative z-10 p-6 flex flex-col flex-1">
                  {/* Icon + tagline */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-4xl">{game.emoji}</span>
                    <span className={`text-[11px] font-semibold tracking-widest uppercase ${game.accentColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                      {game.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {game.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                    {game.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2">
                    {game.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${game.accentColor} opacity-70`} style={{ background: "currentColor" }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Divider + CTA */}
                  <div className="mt-6 pt-4 border-t border-[#1e3048] group-hover:border-[#2e4a68] transition-colors">
                    <a
                      href="#contact"
                      className={`text-sm font-medium ${game.accentColor} opacity-70 group-hover:opacity-100 transition-all inline-flex items-center gap-1.5`}
                    >
                      Book this table
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
