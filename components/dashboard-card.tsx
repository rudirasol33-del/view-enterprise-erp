"use client";

import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="
        rounded-3xl
        p-6
        bg-white/70
        backdrop-blur-xl
        border
        border-white/40
        shadow-lg
        hover:shadow-2xl
        transition-all
      "
    >

      <p className="text-sm text-gray-500">
        {title}
      </p>


      <h3 className="
        mt-4
        text-4xl
        font-bold
        text-[#071A33]
        tracking-tight
      ">
        {value}
      </h3>


      <div className="
        mt-4
        inline-flex
        px-3
        py-1
        rounded-full
        bg-blue-50
        text-blue-600
        text-sm
      ">
        {subtitle}
      </div>

    </motion.div>
  );
}