"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        mb-8
        p-8
        bg-gradient-to-br
        from-[#071A33]
        to-[#0066CC]
        text-white
      "
    >

      <div
        className="
          absolute
          -right-20
          -top-20
          w-96
          h-96
          rounded-full
          bg-white/10
          blur-3xl
        "
      />


      <div className="relative z-10">


        <p className="
          text-blue-200
          text-sm
          uppercase
          tracking-widest
        ">
          VE One Platform
        </p>


        <h1 className="
          mt-3
          text-4xl
          font-bold
        ">
          Good Morning, Rudi 👋
        </h1>


        <p className="
          mt-4
          text-gray-200
          max-w-xl
        ">
          Your complete business overview.
          Manage customers, sales, deliveries and operations from one intelligent platform.
        </p>



        <div
          className="
            mt-8
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
          "
        >

          <Box
            title="Revenue"
            value="$2.4M"
          />

          <Box
            title="Customers"
            value="48"
          />

          <Box
            title="Projects"
            value="23"
          />

          <Box
            title="Deliveries"
            value="12"
          />

        </div>


      </div>


    </motion.div>
  );
}



function Box({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        p-4
      "
    >

      <p className="
        text-sm
        text-blue-100
      ">
        {title}
      </p>


      <h3 className="
        mt-2
        text-2xl
        font-bold
      ">
        {value}
      </h3>


    </div>

  );

}