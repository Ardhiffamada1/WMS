"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Layers,
  ClipboardCheck,
  UserCheck,
} from "lucide-react";

// Pengelompokan menu agar lebih terstruktur & scannable
const menuGroups = [
  {
    title: "Main Workspace",
    items: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Products", href: "/dashboard/products", icon: Package },
      { name: "Categories", href: "/dashboard/categories", icon: Tags },
      { name: "Suppliers", href: "/dashboard/suppliers", icon: Users },
    ],
  },
  {
    title: "Stock Control",
    items: [
      { name: "Inventory", href: "/dashboard/inventory", icon: Layers },
      {
        name: "Stock Opname",
        href: "/dashboard/stock-opname",
        icon: ClipboardCheck,
      },
      {
        name: "Inbound (Stock In)",
        href: "/dashboard/stock-in",
        icon: ArrowDownLeft,
      },
      {
        name: "Outbound (Stock Out)",
        href: "/dashboard/stock-out",
        icon: ArrowUpRight,
      },
    ],
  },
  {
    title: "Management & System",
    items: [
      { name: "Audit Logs", href: "/dashboard/transactions", icon: History },
      { name: "User Control", href: "/dashboard/users", icon: UserCheck },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 px-5 py-6 flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 pb-5 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 font-bold text-zinc-100 dark:text-zinc-950 text-sm shadow-sm">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
              WMS Enterprise
            </span>
            <span className="text-xs text-zinc-500 font-mono mt-0.5">
              v2026.1 Core
            </span>
          </div>
        </div>

        {/* Grouped Navigation List */}
        <div className="mt-5 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                {group.title}
              </p>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 ${
                          isActive
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer System Status */}
      <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/40 p-3">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Online System
          </span>
          <span>2026</span>
        </div>
      </div>
    </aside>
  );
}
