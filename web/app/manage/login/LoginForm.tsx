"use client";

import { useActionState } from "react";
import { loginAction } from "../lib/actions";
import type { ActionError } from "../lib/types";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionError | null, FormData>(
    loginAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Error banner */}
      {state?.error && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-400 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {state.error}
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="owner@snookx.in"
          className="w-full px-4 py-3 rounded-xl bg-[#0a1018] border border-[#1e3048]
            text-slate-200 placeholder-slate-600 text-sm
            focus:outline-none focus:border-felt/70 focus:ring-2 focus:ring-felt/20
            transition-all duration-200 disabled:opacity-60"
          disabled={isPending}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-xs font-semibold tracking-wider uppercase text-slate-500 mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••••"
          className="w-full px-4 py-3 rounded-xl bg-[#0a1018] border border-[#1e3048]
            text-slate-200 placeholder-slate-600 text-sm
            focus:outline-none focus:border-felt/70 focus:ring-2 focus:ring-felt/20
            transition-all duration-200 disabled:opacity-60"
          disabled={isPending}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 rounded-xl
          bg-gradient-to-r from-green-700 to-green-600
          hover:from-green-600 hover:to-green-500
          disabled:opacity-60 disabled:cursor-not-allowed
          text-white font-semibold text-sm
          transition-all duration-200 hover:shadow-lg hover:shadow-green-900/40 hover:scale-[1.01]
          flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
