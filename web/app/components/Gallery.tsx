import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

type GalleryItem = {
  seed: string;
  alt: string;
  label: string;
  sublabel?: string;
  span?: "wide" | "tall";
};

const ITEMS: GalleryItem[] = [
  { seed: "snooker-table",  alt: "Premium snooker table",          label: "Championship Tables",   sublabel: "12ft Professional",  span: "wide" },
  { seed: "billiards-cue",  alt: "Billiard cue and balls",         label: "Professional Equipment", sublabel: "Tournament Grade" },
  { seed: "pool-hall",      alt: "Interior of the club",           label: "Our Venue",              sublabel: "Premium Atmosphere" },
  { seed: "snooker-break",  alt: "Player lining up a break shot",  label: "Tournament Play",        sublabel: "Competitive Matches" },
  { seed: "green-felt",     alt: "Close-up of green felt",         label: "Premium Felt",           sublabel: "Imported Cloth",    span: "tall" },
  { seed: "night-pool",     alt: "Evening atmosphere",             label: "Night Sessions",         sublabel: "Open Till Midnight" },
  { seed: "rack-balls",     alt: "Racked pool balls",              label: "Ready to Play",          sublabel: "Always Set Up" },
  { seed: "cue-chalk",      alt: "Chalking a cue",                 label: "The Craft",              sublabel: "Master Your Game" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <RevealOnScroll extraClass="text-center mb-14">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-900/30 text-amber-400 border border-amber-800/40">
            Our Venue
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            A <span className="gradient-text">Glimpse</span> Inside
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            State-of-the-art tables, premium lighting, and an atmosphere that
            elevates every frame you play.
          </p>
        </RevealOnScroll>

        {/* ── Masonry-style grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {ITEMS.map((item, i) => (
            <RevealOnScroll
              key={item.seed}
              delay={i * 60}
              extraClass={`${item.span === "wide" ? "col-span-2" : ""} ${item.span === "tall" ? "row-span-2" : ""}`}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-[#1e3048] hover:border-[#2e4a68] transition-all duration-500 w-full h-full">
                <Image
                  src={`https://picsum.photos/seed/${item.seed}/900/600`}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a0e]/85 via-[#060a0e]/15 to-transparent
                  group-hover:from-[#060a0e]/90 transition-all duration-500" />

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Green ring glow on hover */}
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-felt/40 transition-all duration-300" />

                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <span className="text-sm font-semibold text-white block group-hover:text-amber-400 transition-colors duration-200">
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {item.sublabel}
                    </span>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
