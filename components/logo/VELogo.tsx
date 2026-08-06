"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface VELogoProps {
  size?: number;
  showText?: boolean;
}

export default function VELogo({
  size = 52,
  showText = true,
}: VELogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <Image
        src="/logo.png"
        alt="View Enterprise"
        width={size}
        height={size}
        priority
      />

      {showText && (
        <div className="leading-tight">
          <h1 className="text-2xl font-bold text-white">
            VE<span className="text-sky-400">One</span>
          </h1>

          <p className="text-xs text-slate-400 tracking-[0.25em] uppercase">
            Developed by View Enterprise
          </p>
        </div>
      )}
    </motion.div>
  );
}