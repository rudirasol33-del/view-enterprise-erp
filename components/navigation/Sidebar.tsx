"use client";

import VELogo from "@/components/logo/VELogo";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "CRM", icon: Users },
  { title: "Inventory", icon: Package },
  { title: "Quotations", icon: FileText },
  { title: "Deliveries", icon: Truck },
  { title: "Reports", icon: BarChart3 },
  { title: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen border-r border-white/10 bg-[#081B34]/90 backdrop-blur-xl">
      <div className="p-6 border-b border-white/10">
        <VELogo />
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
                flex
                items-center
                gap-3
                w-full
                rounded-2xl
                px-4
                py-3
                text-slate-300
                transition
                hover:bg-sky-500/10
                hover:text-white
              "
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}