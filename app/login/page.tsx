"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import GlassCard from "@/components/shared/GlassCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

type Company = {
  id: string;
  name: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getCompanies() {
      setIsLoadingCompanies(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("companies")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error(error);
        setErrorMessage("Unable to load companies. Please try again.");
        setIsLoadingCompanies(false);
        return;
      }

      const companyList = data ?? [];

      setCompanies(companyList);

      if (companyList.length > 0) {
        setCompany(companyList[0].name);
      }

      setIsLoadingCompanies(false);
    }

    getCompanies();
  }, []);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!company) {
      setErrorMessage("Please select a company.");
      return;
    }

    setIsSigningIn(true);

    // Authentication will be connected later.
    window.setTimeout(() => {
      router.push(`/dashboard?company=${encodeURIComponent(company)}`);
    }, 550);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06172f] text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute -bottom-52 right-[-120px] h-[620px] w-[620px] rounded-full bg-blue-600/25 blur-[140px]" />
        <div className="absolute left-[42%] top-[20%] h-[360px] w-[360px] rounded-full bg-sky-400/10 blur-[110px]" />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left brand section */}
        <section className="hidden min-h-screen flex-col justify-between p-12 lg:flex xl:p-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-between"
          >
            <div className="rounded-2xl border border-white/10 bg-white px-5 py-3 shadow-2xl">
              <Image
                src="/logo.png"
                alt="View Enterprise"
                width={300}
                height={90}
                priority
                className="h-auto w-[220px] object-contain"
              />
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              Secure Enterprise Platform
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              One intelligent platform for your entire business
            </div>

            <h1 className="max-w-3xl text-6xl font-semibold leading-[1.04] tracking-[-0.055em] xl:text-7xl">
              Run every part of your business with{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                VE One.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Manage customers, sales, inventory, deliveries, HR, finance,
              projects and intelligent workflows from one unified workspace.
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["CRM", "Customers & sales"],
                ["Operations", "Inventory & delivery"],
                ["VE AI", "Smart business automation"],
              ].map(([title, description], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + index * 0.08,
                    duration: 0.5,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl"
                >
                  <p className="font-medium text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <p>© 2026 View Enterprise. All rights reserved.</p>
            <p>VE One · Enterprise Business Platform</p>
          </div>
        </section>

        {/* Login section */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full max-w-[490px]"
          >
            {/* Mobile logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="rounded-2xl bg-white px-5 py-3 shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="View Enterprise"
                  width={260}
                  height={80}
                  priority
                  className="h-auto w-[210px] object-contain"
                />
              </div>
            </div>

            <GlassCard className="relative overflow-hidden p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />

              <div className="relative">
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                    <Building2 className="h-6 w-6 text-cyan-300" />
                  </div>

                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">
                    VE One Workspace
                  </p>

                  <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white">
                    Welcome back
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Sign in to continue to your company workspace.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Company workspace
                    </label>

                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <select
                        id="company"
                        value={company}
                        disabled={isLoadingCompanies}
                        onChange={(event) => setCompany(event.target.value)}
                        className="
                          h-13 w-full appearance-none rounded-2xl
                          border border-white/10 bg-white/[0.07]
                          px-11 pr-10 text-sm text-white outline-none
                          transition duration-200
                          hover:border-white/20
                          focus:border-cyan-300/50 focus:bg-white/10
                          disabled:cursor-not-allowed disabled:opacity-60
                        "
                      >
                        {isLoadingCompanies && (
                          <option className="bg-[#0b2345]">
                            Loading companies...
                          </option>
                        )}

                        {!isLoadingCompanies &&
                          companies.map((item) => (
                            <option
                              key={item.id}
                              value={item.name}
                              className="bg-[#0b2345]"
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>

                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="name@company.com"
                        autoComplete="email"
                        className="
                          h-13 w-full rounded-2xl
                          border border-white/10 bg-white/[0.07]
                          px-11 text-sm text-white outline-none
                          placeholder:text-slate-500
                          transition duration-200
                          hover:border-white/20
                          focus:border-cyan-300/50 focus:bg-white/10
                        "
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-200"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs text-cyan-300 transition hover:text-cyan-200"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="
                          h-13 w-full rounded-2xl
                          border border-white/10 bg-white/[0.07]
                          px-11 pr-12 text-sm text-white outline-none
                          placeholder:text-slate-500
                          transition duration-200
                          hover:border-white/20
                          focus:border-cyan-300/50 focus:bg-white/10
                        "
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      isLoadingCompanies || isSigningIn || companies.length === 0
                    }
                    className="
                      mt-2 h-13 w-full rounded-2xl
                      bg-gradient-to-r from-cyan-400 to-blue-600
                      text-sm font-semibold text-white
                      shadow-[0_18px_45px_rgba(14,165,233,0.22)]
                      transition duration-300
                      hover:scale-[1.01] hover:from-cyan-300 hover:to-blue-500
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {isSigningIn ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Opening workspace...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Continue to VE One
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Protected by VE One enterprise security
                </div>
              </div>
            </GlassCard>

            <p className="mt-6 text-center text-xs text-slate-500">
              Developed by{" "}
              <span className="font-medium text-slate-300">
                View Enterprise
              </span>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}