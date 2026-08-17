import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CirclePlus,
  Clock3,
  Globe2,
  MapPin,
  MoreHorizontal,
  ShieldCheck,
  Users,
  Warehouse,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { organizationCompanies, roles } from "@/lib/organization";

export default function OrganizationPage() {
  const branches = organizationCompanies.flatMap((company) => company.branches);
  const activeBranches = branches.filter((branch) => branch.status === "active");
  const totalWarehouses = branches.reduce(
    (total, branch) => total + branch.warehouses,
    0,
  );

  return (
    <AppShell
      title="Companies & Branches"
      subtitle="Manage legal entities, branches, operational scope and access boundaries."
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Legal companies"
          value={organizationCompanies.length.toString().padStart(2, "0")}
          note="View Enterprise Iraq"
          icon={Building2}
          tone="blue"
        />
        <MetricCard
          label="Active branches"
          value={activeBranches.length.toString().padStart(2, "0")}
          note={`${branches.length - activeBranches.length} planned locations`}
          icon={MapPin}
          tone="cyan"
        />
        <MetricCard
          label="Access roles"
          value={roles.length.toString().padStart(2, "0")}
          note="Role templates ready"
          icon={Users}
          tone="violet"
        />
        <MetricCard
          label="Warehouse locations"
          value={totalWarehouses.toString().padStart(2, "0")}
          note="Physical and operational"
          icon={Warehouse}
          tone="emerald"
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_60px_-40px_rgba(15,35,65,0.35)]">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-sky-600" />
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Organization structure</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Each company owns separate books, settings and operational branches.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#071a33] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#0b2a52]"
          >
            <CirclePlus className="h-4 w-4" />
            Add company
          </button>
        </div>

        <div className="grid gap-5 p-5 xl:grid-cols-2 xl:p-6">
          {organizationCompanies.map((company) => (
            <article
              key={company.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-[#fbfcfe]"
            >
              <div className="border-b border-slate-200 bg-gradient-to-r from-[#071a33] to-[#0b315d] p-5 text-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-300">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{company.name}</h3>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-200">
                        Active
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {company.code} · {company.currency} · {company.timezone}
                    </p>
                  </div>
                  <button type="button" className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 p-3">
                {company.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="group flex items-center gap-3 rounded-2xl border border-transparent bg-white p-3 transition hover:border-sky-100 hover:shadow-sm"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        branch.status === "active"
                          ? "bg-sky-50 text-sky-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {branch.status === "active" ? (
                        <MapPin className="h-5 w-5" />
                      ) : (
                        <Clock3 className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#071a33]">
                          {branch.name}
                        </p>
                        {branch.isHeadOffice && (
                          <span className="rounded-md bg-cyan-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-700">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {branch.code} · {branch.warehouses > 0 ? `${branch.warehouses} active warehouse` : "No active warehouse"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-medium capitalize ${
                        branch.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {branch.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-sky-500" />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="access"
        className="mt-6 scroll-mt-28 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_60px_-40px_rgba(15,35,65,0.35)]"
      >
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-sky-600" />
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Roles & access control</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Access is scoped by tenant, company, branch and business function.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#071a33] transition hover:border-sky-200 hover:bg-sky-50"
          >
            <CirclePlus className="h-4 w-4" />
            Create role
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <th className="px-6 py-3.5">Role</th>
                <th className="px-5 py-3.5">Scope</th>
                <th className="px-5 py-3.5">Access level</th>
                <th className="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role) => (
                <tr key={role.name} className="transition hover:bg-sky-50/35">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <RoleBadge tone={role.color} />
                      <span className="text-sm font-medium text-[#071a33]">{role.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{role.scope}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {role.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Active
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Building2;
  tone: "blue" | "cyan" | "violet" | "emerald";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    cyan: "bg-cyan-50 text-cyan-600",
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <article className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_-38px_rgba(15,35,65,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#071a33]">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{note}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

function RoleBadge({ tone }: { tone: string }) {
  const tones: Record<string, string> = {
    cyan: "bg-cyan-100 text-cyan-700",
    blue: "bg-blue-100 text-blue-700",
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone] ?? tones.slate}`}>
      <ShieldCheck className="h-4 w-4" />
    </span>
  );
}
