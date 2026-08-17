"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import {
  Bell,
  Bot,
  Building2,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  X,
} from "lucide-react";

import SyncStatus from "@/components/pwa/SyncStatus";

type AppShellProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  company?: string;
  branch?: string;
};

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "CRM", href: "/crm", icon: Users, disabled: true },
  { label: "Inventory", href: "/inventory", icon: Package, disabled: true },
  { label: "Finance", href: "/finance", icon: CircleDollarSign, disabled: true },
  { label: "Tenders", href: "/tenders", icon: FileCheck2, disabled: true },
  { label: "Logistics", href: "/logistics", icon: Truck, disabled: true },
  { label: "VE AI", href: "/ai", icon: Bot, disabled: true },
];

const administration = [
  {
    label: "Companies & Branches",
    href: "/settings/organization",
    icon: Building2,
  },
  {
    label: "Roles & Access",
    href: "/settings/organization#access",
    icon: ShieldCheck,
  },
  { label: "Settings", href: "/settings", icon: Settings, disabled: true },
];

export default function AppShell({
  children,
  title,
  subtitle,
  company = "View Enterprise KRG Iraq",
  branch = "Erbil HQ",
}: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col bg-[#06172f] text-white">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <Link href="/dashboard" className="rounded-xl bg-white px-3 py-2 shadow-lg">
          <Image
            src="/logo.png"
            alt="View Enterprise"
            width={170}
            height={48}
            className="h-auto w-[150px] object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/10 to-blue-500/10 p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{company}</p>
            <p className="mt-0.5 truncate text-xs text-slate-400">{branch}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <NavigationGroup
          label="Workspace"
          items={navigation}
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
        <NavigationGroup
          label="Administration"
          items={administration}
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.055] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 font-semibold text-white shadow-lg shadow-blue-950/40">
            R
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Rudi Rasool</p>
            <p className="text-xs text-slate-400">Owner · Full access</p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full border-2 border-[#06172f] bg-emerald-400" />
        </div>
        <p className="mt-3 text-center text-[10px] tracking-wide text-slate-600">
          VE One · Developed by View Enterprise
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#071a33]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-[290px] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
          <div className="flex h-20 items-center gap-4 px-4 sm:px-6 xl:px-8">
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-semibold tracking-[-0.03em] text-[#071a33] sm:text-2xl">
                {title}
              </h1>
              <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">{subtitle}</p>
            </div>

            <div className="hidden w-full max-w-[310px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 xl:flex">
              <Search className="h-4 w-4" />
              <span>Search customers, products, documents...</span>
            </div>

            <SyncStatus />

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-600"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 xl:px-8 xl:py-8">{children}</main>
      </div>
    </div>
  );
}

type NavigationItem = (typeof navigation)[number] | (typeof administration)[number];

function NavigationGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: NavigationItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
        {label}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const itemPath = item.href.split("#")[0];
          const active =
            itemPath === "/dashboard"
              ? pathname === itemPath
              : pathname.startsWith(itemPath) && !item.disabled;

          const className = `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
            active
              ? "bg-gradient-to-r from-cyan-400/20 to-blue-500/10 font-medium text-white"
              : item.disabled
                ? "cursor-not-allowed text-slate-600"
                : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
          }`;

          if (item.disabled) {
            return (
              <div key={item.label} className={className} title="Coming in the next module phase">
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-slate-600">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link key={item.label} href={item.href} className={className} onClick={onNavigate}>
              <Icon className={`h-5 w-5 ${active ? "text-cyan-300" : ""}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
