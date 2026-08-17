"use client";

import { Cloud, CloudOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

type ConnectionState = "online" | "offline" | "syncing";

export default function SyncStatus() {
  const [state, setState] = useState<ConnectionState>("online");

  useEffect(() => {
    const updateConnection = () => {
      setState(navigator.onLine ? "online" : "offline");
    };

    updateConnection();
    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);

    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  const config = {
    online: {
      label: "Online · Synced",
      Icon: Cloud,
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    offline: {
      label: "Offline · Changes saved locally",
      Icon: CloudOff,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    syncing: {
      label: "Syncing changes",
      Icon: RefreshCw,
      className: "border-sky-200 bg-sky-50 text-sky-700",
    },
  }[state];

  return (
    <div
      className={`hidden items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold shadow-sm sm:flex ${config.className}`}
      aria-live="polite"
    >
      <config.Icon
        className={`h-4 w-4 ${state === "syncing" ? "animate-spin" : ""}`}
      />
      {config.label}
    </div>
  );
}
