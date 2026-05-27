import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060a0e] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
