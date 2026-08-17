import AppShell from "@/components/layout/AppShell";
import HeroSection from "@/components/hero-section";
import DashboardCard from "@/components/dashboard-card";
import SalesChart from "@/components/sales-chart";
import ActivityFeed from "@/components/activity-feed";

type DashboardPageProps = {
  searchParams: Promise<{ company?: string | string[] }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const companyParam = params.company;
  const company =
    (Array.isArray(companyParam) ? companyParam[0] : companyParam) ||
    "View Enterprise";

  return (
    <AppShell
      title="Executive Dashboard"
      subtitle="Good evening, Rudi. Here is what is happening across your business."
      company={company}
    >
      <section>
        <HeroSection />
        <div
          className="
            mt-6
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
    </AppShell>
  );
}
