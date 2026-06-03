"use client";

import { useActionState } from "react";
import { loginAction } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
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
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {state.error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="owner@snookx.in"
          disabled={isPending}
          className="h-11 bg-background"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••••"
          disabled={isPending}
          className="h-11 bg-background"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 text-sm font-semibold"
        size="lg"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <LogIn className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}
