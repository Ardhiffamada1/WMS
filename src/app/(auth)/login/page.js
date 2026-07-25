"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const result = await loginAction(formData);
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-100">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1.5">
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-100">
            W
          </div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-100">
            WMS Apex Portal
          </h1>
          <p className="text-xs text-zinc-500">
            Sign in to manage inventory workspace
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded border border-zinc-700 bg-zinc-900 p-2.5 text-xs text-zinc-300">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-zinc-400">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="staff@company.com"
                required
                className="h-9 border-zinc-800 bg-zinc-950 text-xs text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:ring-0"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-zinc-400">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-9 border-zinc-800 bg-zinc-950 text-xs text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:ring-0"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-9 w-full bg-zinc-100 text-xs font-semibold text-zinc-950 hover:bg-zinc-300 transition-colors mt-2"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 border-t border-zinc-800/60 pt-4 text-center">
            <p className="text-xs text-zinc-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-medium text-zinc-300 hover:underline"
              >
                Daftar Staff
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
