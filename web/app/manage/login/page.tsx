import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In — SnookX Management",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen felt-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-900/15 blur-[100px]"/>
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#060a0e] to-transparent"/>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060a0e] to-transparent"/>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#0d1520]/90 backdrop-blur-sm border border-[#1e3048] rounded-2xl p-8 shadow-2xl shadow-black/50">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-glow mb-4">
              SX
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-100">
              Snook<span className="text-amber-400">X</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">Management Portal</p>
          </div>

          {/* Divider */}
          <div className="border-t border-[#1e3048] mb-6"/>

          <h2 className="text-lg font-semibold text-slate-200 mb-5">Sign in to your account</h2>

          <LoginForm />
        </div>

        {/* Back to landing */}
        <p className="text-center mt-6 text-sm text-slate-600">
          <a href="/" className="hover:text-amber-400 transition-colors duration-200 inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to SnookX Home
          </a>
        </p>
      </div>
    </div>
  );
}
