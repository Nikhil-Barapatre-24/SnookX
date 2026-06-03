import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "./manage/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnookX — Premium Snooker & Pool Club",
  description:
    "Experience the art of the game at SnookX. Premium snooker and pool tables in a luxurious, professional setting.",
  keywords: ["snooker", "pool", "billiards", "club", "SnookX", "snooker club"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* bg-[#060a0e] is a hard fallback for the landing page so the body is
          never white before next-themes hydrates — the management AppShell
          covers it with bg-background for light/dark mode. */}
      <body className="min-h-full flex flex-col font-sans bg-[#060a0e]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
