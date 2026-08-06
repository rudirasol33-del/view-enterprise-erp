"use client";

import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 1.2,
        delay: 2,
      }}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#071A33]
      "
    >

      <div className="text-center">

        <motion.h1
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-6xl
            font-bold
            text-white
            tracking-wider
          "
        >
          VE
          <span className="text-blue-400">
            One
          </span>
        </motion.h1>


        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
            mt-4
            text-gray-300
            tracking-wide
          "
        >
          Enterprise Intelligence Platform
        </motion.p>

      </div>

    </motion.div>
  );
}