import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In — SnookX Management",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient glow — visible more in dark mode */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px]" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-glow mb-4">
              SX
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Snook<span className="text-amber-500">X</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Management Portal</p>
          </div>

          <div className="border-t border-border mb-6" />

          <h2 className="text-lg font-semibold text-foreground mb-5">Sign in to your account</h2>

          <LoginForm />
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
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
