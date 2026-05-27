const INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "123 Game Street, Civil Lines\nYour City, State – 440001",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Hours",
    value: "Mon – Sat: 10:00 AM – 12:00 AM\nSun: 11:00 AM – 10:00 PM",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    label: "Parking",
    value: "Free parking available\nadjacent to the premises",
  },
];

export default function FindUs() {
  return (
    <section id="find-us" className="py-24 lg:py-32 bg-[#060a0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-green-900/30 text-green-400 border border-green-800/40">
            Location
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Find <span className="gradient-text">Us</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Conveniently located in the heart of the city. Come find your table.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* Map — takes 3 / 5 columns on desktop */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-[#1e3048] min-h-[360px] relative">
            {/* Replace the src below with your actual Google Maps embed URL */}
            <iframe
              src="https://maps.google.com/maps?q=Nagpur,Maharashtra,India&hl=en&z=14&output=embed"
              title="SnookX Location"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Subtle border overlay */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#1e3048] pointer-events-none" />
          </div>

          {/* Info cards — takes 2 / 5 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {INFO.map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex gap-4 p-5 rounded-2xl bg-[#0d1520] border border-[#1e3048]
                  hover:border-[#2e4a68] transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-felt/20 text-felt-light flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {value}
                  </p>
                </div>
              </div>
            ))}

            {/* Directions CTA */}
            <a
              href="https://maps.google.com/?q=SnookX+Club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-[#2e4a68]
                text-sm font-medium text-felt-light hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/30
                transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
