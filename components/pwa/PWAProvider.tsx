"use client";

import { useEffect, type ReactNode } from "react";

export default function PWAProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (error) {
        console.error("VE One service worker registration failed", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return children;
}
