import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Trash2, AlertCircle } from "lucide-react";
import {
  LogOut, BookOpen, Briefcase, Sparkles,
  TrendingUp, ChevronRight,
  LayoutDashboard, Settings, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const [showConfirm, setShowConfirm] = React.useState(null);
useEffect(() => {
  if (!user) return;

  const channel = supabase
    .channel("course-progress-updates")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "course_progress",
        filter: `user_id=eq.${user.id}`,
      },
      () => {
        fetchEnrolledCourses(); // 🔥 refresh progress
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
useEffect(() => {
  if (!user) return;

  const fetchEnrolledCourses = async () => {
    const { data, error } = await supabase
      .from("course_progress")
      .select(`
        course_id,
        progress,
        courses ( title )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    const formatted = data.map(item => ({
      id: item.course_id,
      title: item.courses.title,
      progress: item.progress
    }));

    setEnrolledCourses(formatted);
  };

  fetchEnrolledCourses();
}, [user]);

  if (loading) return null;
const handleUnenroll = async (courseId) => {
  await supabase
    .from("course_progress")
    .delete()
    .eq("user_id", user.id)
    .eq("course_id", courseId);

  setEnrolledCourses(prev =>
    prev.filter(course => course.id !== courseId)
  );

  setShowConfirm(null);
};


  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Assuming the profile route is "/profile"
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
        {/* Profile Section */}
        <div className="mb-10">
          <div 
            className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-500/10 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
            onClick={handleProfileClick}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>

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

      
        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* UPDATED: Dynamic Count */}
          <StatCard 
            title="Courses Enrolled" 
            value={enrolledCourses.length.toString()} 
            icon={<BookOpen />} 
            emoji="📚" 
          />
          <StatCard title="Jobs Applied" value="5" icon={<Briefcase />} emoji="💼" />
          <StatCard title="Earnings" value="₹12,700" icon={<TrendingUp />} emoji="💰" />
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <GlassCard title="Continuous Learning" icon={<BookOpen />}>
              <button 
                onClick={() => navigate("/courses")}
                className="text-purple-600 text-sm font-bold hover:underline hover:text-purple-700"
              >
                View All →
              </button>
{/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#121826] p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-red-100 dark:border-red-900/30 text-center"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Are you sure?</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                You will lose all your learning data and progress for this course. This cannot be undone.
              </p>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleUnenroll(showConfirm)}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
                >
                  Unenroll
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
              {/* UPDATED: Dynamic Progress Items */}
             {enrolledCourses.length > 0 ? (
  enrolledCourses.map((course) => (
    <div key={course.id} className="relative group">
      <ProgressItem title={course.title} progress={course.progress || 0} />
      <button 
        onClick={() => setShowConfirm(course.id)}
        className="absolute -right-2 top-0 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  ))
) : (
  <p className="text-slate-500 text-sm italic py-4">
    No courses enrolled yet. Head to the Explore section!
  </p>
)}

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