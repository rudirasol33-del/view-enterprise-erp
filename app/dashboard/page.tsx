"use client";

import { useSearchParams } from "next/navigation";

import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/hero-section";
import DashboardCard from "@/components/dashboard-card";
import SalesChart from "@/components/sales-chart";
import ActivityFeed from "@/components/activity-feed";


export default function DashboardPage() {


  const params = useSearchParams();


  const company =
    params.get("company") || "View Enterprise";



  return (

    <main
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-white
        to-blue-100
      "
    >



      {/* Sidebar */}

      <Sidebar />




      {/* Main Content */}

      <section
        className="
          flex-1
          p-8
        "
      >



        {/* Company Header */}

        <div
          className="
            mb-6
            flex
            justify-between
            items-center
          "
        >


          <div>

            <p
              className="
                text-gray-500
              "
            >
              Current Company
            </p>


            <h2
              className="
                text-2xl
                font-bold
                text-[#071A33]
              "
            >
              {company}
            </h2>


          </div>



          <div
            className="
              bg-white
              rounded-2xl
              px-5
              py-3
              shadow
              text-[#071A33]
              font-semibold
            "
          >
            Manager
          </div>


        </div>





        {/* Hero Section */}

        <HeroSection />






        {/* KPI Cards */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >


          <DashboardCard
            title="Revenue Today"
            value="$125,400"
            subtitle="+12%"
          />



          <DashboardCard
            title="Customers"
            value="245"
            subtitle="Active"
          />



          <DashboardCard
            title="Deliveries"
            value="16"
            subtitle="Today"
          />



          <DashboardCard
            title="Inventory"
            value="1,240"
            subtitle="Products"
          />



        </div>







        {/* Analytics Section */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >


          <SalesChart />


          <ActivityFeed />


        </div>





      </section>




    </main>

  );

}