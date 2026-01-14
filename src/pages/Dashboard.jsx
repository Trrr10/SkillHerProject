import React from "react";
import { 
  LogOut, BookOpen, Briefcase, Sparkles, 
  TrendingUp, Clock, CheckCircle, ChevronRight,
  PlusCircle, LayoutDashboard, Settings
} from "lucide-react";

export default function Dashboard() {
  const user = { name: "Vedika" };

  return (
    <div className="min-h-screen flex bg-[#F8F7FF] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white relative overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64
                 bg-white/90 backdrop-blur-xl
                 border-r border-purple-200
                 flex-col p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative z-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-10 drop-shadow-sm animate-gradient bg-[length:200%_auto]">
          SkillHer ✨
        </div>
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20}/>} label="My Courses" />
          <NavItem icon={<Briefcase size={20}/>} label="Job Board" />
          <NavItem icon={<Sparkles size={20}/>} label="Services" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
        <button className="flex items-center gap-3 text-gray-500 hover:text-red-600 transition-colors p-3 mt-auto hover:bg-red-50 rounded-xl">
          <LogOut size={20} />
          <span className="font-semibold">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 tracking-tight drop-shadow-sm">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-slate-600 font-medium mt-2">Here's what's happening with your career today.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Courses Enrolled" value="3" icon={<BookOpen className="text-purple-600" />} color="bg-gradient-to-br from-purple-50 to-purple-100" emoji="📚" />
          <StatCard title="Jobs Applied" value="5" icon={<Briefcase className="text-pink-600" />} color="bg-gradient-to-br from-pink-50 to-pink-100" emoji="💼" />
          <StatCard title="Earnings" value="₹12,700" icon={<TrendingUp className="text-emerald-600" />} color="bg-gradient-to-br from-emerald-50 to-emerald-100" emoji="💰" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Learning & Services */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Learning Progress Card */}
            <section className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_10px_40px_rgba(168,85,247,0.12)] border border-purple-100 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-500" /> Continuous Learning
                </h2>
                <button className="text-purple-600 text-sm font-bold hover:underline hover:text-purple-700">View All →</button>
              </div>

              <div className="space-y-6 relative z-10">
                <ProgressItem title="Web Development Basics" progress={70} color="bg-gradient-to-r from-purple-500 to-purple-600" />
                <ProgressItem title="UI/UX Advanced Masterclass" progress={40} color="bg-gradient-to-r from-pink-500 to-pink-600" />
              </div>
            </section>

            {/* Services Section */}
            <section className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_10px_40px_rgba(168,85,247,0.12)] border border-purple-100 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-100 to-pink-100 rounded-full blur-3xl opacity-50 -ml-16 -mb-16" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-500" /> Your Active Services
                </h2>
                <button className="flex items-center gap-1 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg hover:scale-105 transition-all">
                  <PlusCircle size={16} /> Create New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <ServiceCard title="Resume Design" orders={12} revenue="8,500" />
                <ServiceCard title="Instagram Branding" orders={6} revenue="4,200" />
              </div>
            </section>
          </div>

          {/* Right Column: Job Applications */}
          <div className="xl:col-span-1">
            <section className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_10px_40px_rgba(168,85,247,0.12)] border border-purple-100 h-full relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -mr-12 -mt-12" />
              
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                <Briefcase size={20} className="text-blue-500" /> Applications
                <span className="ml-auto flex h-2 w-2">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-green-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-green-500" />
                </span>
              </h2>
              <div className="space-y-4 relative z-10">
                <JobItem company="Frontend Intern" type="Remote" status="Under Review" statusColor="text-amber-700 bg-amber-50 border border-amber-200" />
                <JobItem company="Content Writer" type="Part-time" status="Shortlisted" statusColor="text-emerald-700 bg-emerald-50 border border-emerald-200" />
                <JobItem company="UI Designer" type="Contract" status="Closed" statusColor="text-slate-500 bg-slate-50 border border-slate-200" />
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-slate-700 font-bold hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 hover:shadow-md transition-all flex items-center justify-center gap-2 border border-gray-200 relative z-10">
                Search More Jobs <ChevronRight size={16} />
              </button>
            </section>
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

// --- Sub-Components for Cleanliness ---

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 active:scale-95 relative overflow-hidden group ${active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_8px_30px_rgba(168,85,247,0.5)]" : "text-slate-500 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md"}`}>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      <span className={`${active ? "" : "group-hover:scale-110 transition-transform"} relative z-10`}>{icon}</span>
      <span className="font-bold text-sm tracking-wide relative z-10">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color, emoji }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[24px] border-0 flex items-center gap-5 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] hover:-translate-y-2 cursor-pointer group relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Mini sparkline background */}
      <svg className="absolute bottom-0 right-0 w-32 h-16 opacity-10" viewBox="0 0 120 60">
        <polyline points="0,50 30,30 60,40 90,20 120,10" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-500"/>
      </svg>
      
      <div className={`${color} p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg relative z-10`}>
        {icon}
        <div className="absolute -top-1 -right-1 text-lg">{emoji}</div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">{value}</h3>
      </div>
    </div>
  );
}

function ProgressItem({ title, progress, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-slate-700 mb-3">
        <span className="flex items-center gap-2">
          {title}
          {progress > 90 && <span className="text-lg animate-bounce">🏆</span>}
        </span>
        <span className="text-purple-600 font-extrabold">{progress}%</span>
      </div>
      <div className="relative w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className={`${color} h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden`} 
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

function ServiceCard({ title, orders, revenue }) {
  return (
    <div className="border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 p-5 rounded-2xl transition-all duration-300 hover:shadow-[0_12px_30px_rgba(168,85,247,0.2)] hover:bg-white hover:-translate-y-1 hover:border-purple-400 group cursor-pointer relative overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-purple-400/10 group-hover:via-pink-400/10 group-hover:to-purple-400/10 transition-all duration-500 rounded-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-slate-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-pink-600 transition-all">{title}</h3>
          <span className="text-xl group-hover:scale-125 transition-transform">⭐</span>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-xs text-slate-500 font-medium italic">Orders: {orders} 📦</p>
          <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">₹{revenue}</p>
        </div>
      </div>
    </div>
  );
}

function JobItem({ company, type, status, statusColor }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-200 hover:shadow-md group cursor-pointer">
      <div className="flex flex-col">
        <span className="font-bold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">{company}</span>
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1">{type}</span>
      </div>
      <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight ${statusColor} shadow-sm`}>
        {status}
      </span>
    </div>
  );
}