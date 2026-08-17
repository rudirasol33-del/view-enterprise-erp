"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      queueMicrotask(() => setIsChecking(false));
      return;
    }

    let active = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (!data.session) {
        router.replace("/login");
        return;
      }

      setIsChecking(false);
    };

    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/login");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06172f] text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-300/10">
            <ShieldCheck className="h-7 w-7 animate-pulse text-cyan-300" />
          </div>
          <p className="mt-5 text-sm font-medium">Securing your workspace...</p>
          <p className="mt-1 text-xs text-slate-500">VE One access verification</p>
        </div>
      </div>
    );
  }

  return children;
}
