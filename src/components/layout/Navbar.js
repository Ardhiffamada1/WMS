"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { logoutAction } from "@/lib/actions/authActions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, Search, Command, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar({ profile }) {
  const displayName = profile?.full_name || "System User";
  const displayRole = profile?.role || "STAFF";

  const searchInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update query params di URL saat user mengetik
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // Replace URL tanpa reload full page
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 px-8 backdrop-blur-md">
      {/* Dynamic Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-zinc-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari SKU, produk, lokasi rak..."
            className="h-9 w-72 lg:w-96 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 pl-10 pr-12 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none transition-all"
          />

          {searchQuery ? (
            <button
              onClick={handleClear}
              className="absolute right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="absolute right-3 flex items-center gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 pointer-events-none">
              <Command className="h-3 w-3" /> K
            </div>
          )}
        </div>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">
              {displayName}
            </p>
            <p className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase mt-1">
              {displayRole}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className="h-9 w-9 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
