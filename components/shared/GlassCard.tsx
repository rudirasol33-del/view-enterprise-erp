import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        "border border-white/10",
        "bg-white/5",
        "backdrop-blur-2xl",
        "shadow-2xl",
        "transition-all duration-300",
        "hover:border-sky-400/30",
        "hover:bg-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}