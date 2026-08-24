"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction } from "./actions";
import { siteConfig } from "@/lib/seo";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-brand flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Card */}
        <form
          action={action}
          className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 space-y-5"
        >

          <div className="flex flex-col items-center gap-3">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={124}
              height={124}
              style={{ height: "auto" }}
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <label className="font-technical text-xs uppercase tracking-widest text-neutral-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="font-technical text-xs uppercase tracking-widest text-neutral-500">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          {state?.error && (
            <p className="text-xs text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-brand px-4 py-2.5 font-technical text-xs uppercase tracking-widest text-white transition hover:bg-brand/90 disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

      </div>
    </div>
  );
}
