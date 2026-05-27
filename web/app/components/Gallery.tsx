import Image from "next/image";

type GalleryItem = {
  seed: string;
  alt: string;
  label: string;
  span?: "wide" | "tall";
};

const ITEMS: GalleryItem[] = [
  { seed: "snooker-table",  alt: "Premium snooker table",          label: "Championship Tables",  span: "wide" },
  { seed: "billiards-cue",  alt: "Billiard cue and balls",         label: "Professional Equipment" },
  { seed: "pool-hall",      alt: "Interior of the club",           label: "Our Venue" },
  { seed: "snooker-break",  alt: "Player lining up a break shot",  label: "Tournament Play" },
  { seed: "green-felt",     alt: "Close-up of green felt",         label: "Premium Felt",          span: "tall" },
  { seed: "night-pool",     alt: "Evening atmosphere",             label: "Night Sessions" },
  { seed: "rack-balls",     alt: "Racked pool balls",              label: "Ready to Play" },
  { seed: "cue-chalk",      alt: "Chalking a cue",                 label: "The Craft" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
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
        </div>

        {/* ── Masonry-style grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {ITEMS.map((item) => (
            <div
              key={item.seed}
              className={`group relative overflow-hidden rounded-2xl border border-[#1e3048]
                ${item.span === "wide" ? "col-span-2" : ""}
                ${item.span === "tall" ? "row-span-2" : ""}
              `}
            >
              <Image
                src={`https://picsum.photos/seed/${item.seed}/900/600`}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark scrim — always visible, deeper on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a0e]/80 via-[#060a0e]/20 to-transparent group-hover:from-[#060a0e]/90 transition-all duration-300" />

              {/* Green border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-felt/50 transition-all duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors duration-200">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footnote ── */}
        <p className="mt-8 text-center text-xs text-slate-600">
          Replace these placeholder images with your actual venue photography.
        </p>
      </div>
    </section>
  );
}
