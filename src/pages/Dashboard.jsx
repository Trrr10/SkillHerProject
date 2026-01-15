import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { 
  LogOut, BookOpen, Briefcase, Sparkles, 
  TrendingUp, ChevronRight,
  LayoutDashboard, Settings
} from "lucide-react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="
      min-h-screen flex relative overflow-hidden
      bg-[#F8F7FF] dark:bg-[#0B0E14]
      bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
      from-purple-100 via-pink-50 to-white
      dark:from-purple-900/20 dark:via-fuchsia-900/10 dark:to-[#0B0E14]
    ">

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400/20 dark:bg-purple-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 dark:bg-pink-700/20 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <aside className="
        hidden lg:flex w-64 flex-col p-6 z-10
        bg-white/90 dark:bg-[#121826]/90
        backdrop-blur-xl
        border-r border-purple-200 dark:border-white/10
      ">
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          SkillHer ✨
        </h1>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20} />} label="My Courses" />
          <NavItem icon={<Briefcase size={20} />} label="Job Board" />
          <NavItem icon={<Sparkles size={20} />} label="Services" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 p-3 mt-auto rounded-xl
            text-slate-500 dark:text-slate-400
            hover:bg-red-50 dark:hover:bg-red-500/10
            hover:text-red-600
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 relative z-10 overflow-y-auto">

        {/* Header */}
        <header className="mb-10">
          <h1 className="
            text-3xl md:text-4xl font-extrabold
            text-slate-900 dark:text-white
          ">
            Welcome back, {name} 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Here's what's happening with your career today.
          </p>
        </header>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Courses Enrolled" value="3" icon={<BookOpen />} emoji="📚" />
          <StatCard title="Jobs Applied" value="5" icon={<Briefcase />} emoji="💼" />
          <StatCard title="Earnings" value="₹12,700" icon={<TrendingUp />} emoji="💰" />
        </div>

        <div className="grid xl:grid-cols-3 gap-8">

          {/* Left */}
          <div className="xl:col-span-2 space-y-8">

            <GlassCard title="Continuous Learning" icon={<BookOpen />}>
              <button className="text-purple-600 text-sm font-bold hover:underline hover:text-purple-700">
                View All →
              </button>
              <ProgressItem title="Web Development Basics" progress={70} />
              <ProgressItem title="UI/UX Masterclass" progress={40} />
            </GlassCard>

            <GlassCard title="Your Active Services" icon={<Sparkles />}>
              <div className="grid md:grid-cols-2 gap-4">
                <ServiceCard title="Resume Design" orders={12} revenue="8,500" />
                <ServiceCard title="Instagram Branding" orders={6} revenue="4,200" />
              </div>
            </GlassCard>

          </div>

          {/* Right */}
          <GlassCard title="Applications" icon={<Briefcase />}>
            <JobItem company="Frontend Intern" type="Remote" status="Under Review" />
            <JobItem company="Content Writer" type="Part-time" status="Shortlisted" />
            <JobItem company="UI Designer" type="Contract" status="Closed" />

            <button className="
              w-full mt-6 py-3 rounded-xl
              bg-slate-100 dark:bg-white/5
              text-slate-700 dark:text-slate-300
              hover:bg-purple-50 dark:hover:bg-purple-500/10
              border border-slate-200 dark:border-white/10
              flex items-center justify-center gap-2
            ">
              Search More Jobs <ChevronRight size={16} />
            </button>
          </GlassCard>

        </div>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

function NavItem({ icon, label, active }) {
  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-xl cursor-pointer
      ${active
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        : "text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-white/5"}
    `}>
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, emoji }) {
  return (
    <div className="
      p-6 rounded-2xl flex gap-4 items-center
      bg-white/90 dark:bg-white/5
      border border-purple-100 dark:border-white/10
      backdrop-blur
      hover:shadow-xl transition
    ">
      <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-500/10">
        {icon}
        <span className="block text-lg">{emoji}</span>
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}

function GlassCard({ title, icon, children }) {
  return (
    <section className="
      rounded-2xl p-6 space-y-4
      bg-white/90 dark:bg-white/5
      backdrop-blur
      border border-purple-100 dark:border-white/10
    ">
      <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
        {icon} {title}
      </h2>
      {children}
    </section>
  );
}

function ProgressItem({ title, progress }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-700 dark:text-slate-300">{title}</span>
        <span className="font-bold text-purple-600">{progress}%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ title, orders, revenue }) {
  return (
    <div className="
      p-5 rounded-xl
      border border-purple-200 dark:border-white/10
      bg-white/80 dark:bg-white/5
      hover:shadow-lg transition
    ">
      <h3 className="font-bold text-slate-800 dark:text-white">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">Orders: {orders}</p>
      <p className="text-lg font-bold text-emerald-600">₹{revenue}</p>
    </div>
  );
}

function JobItem({ company, type, status }) {
  return (
    <div className="
      flex justify-between items-center p-3 rounded-xl
      hover:bg-purple-50 dark:hover:bg-white/5 transition
    ">
      <div>
        <p className="font-semibold text-slate-800 dark:text-white">{company}</p>
        <p className="text-xs text-slate-400 uppercase">{type}</p>
      </div>
      <span className="text-xs font-bold text-purple-600">{status}</span>
    </div>
  );
}
