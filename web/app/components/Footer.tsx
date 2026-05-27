const FOOTER_LINKS = [
  { label: "Home",    href: "#home" },
  { label: "Games",   href: "#games" },
  { label: "Gallery", href: "#gallery" },
  { label: "Find Us", href: "#find-us" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#04070a] border-t border-[#1e3048]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main row ── */}
        <div className="py-12 grid sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="sm:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                SX
              </span>
              <span className="text-xl font-bold tracking-wide font-display">
                Snook<span className="text-amber-400">X</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Premium snooker &amp; pool club. Professional tables, expert
              coaching, and a passion for the game.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">Quick Links</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>123 Game Street, Civil Lines</li>
              <li>Your City, State – 440001</li>
              <li className="pt-1">
                <a href="tel:+919876543210" className="hover:text-amber-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@snookx.in" className="hover:text-amber-400 transition-colors">
                  hello@snookx.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-[#1e3048] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} SnookX. All rights reserved.</p>
          <p>Crafted with precision — just like a perfect break.</p>
        </div>
      </div>
    </footer>
  );
}
