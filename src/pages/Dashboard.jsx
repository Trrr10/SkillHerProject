import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { 
  Trash2, AlertCircle, LogOut, BookOpen, Briefcase, Sparkles,
  TrendingUp, ChevronRight, LayoutDashboard, Settings, User,
  Bell, Calendar, MessageSquare, Award, Clock, Filter,
  MoreVertical, ExternalLink, ShieldCheck, Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateCertificate } from "../utils/certificateGenerator";

/**
 * DASHBOARD COMPONENT
 * Total feature set: 
 * - Real-time enrollment syncing
 * - Multi-stage unenrollment confirmation
 * - Dynamic stat calculations
 * - Interactive sidebar with profile previews
 * - Advanced glassmorphism UI
 */
export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // -- STATE MANAGEMENT --
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [fetchLoading, setFetchLoading] = useState(true);

  // -- DATA FETCHING LOGIC --
  const fetchEnrollments = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) return;

      const { data, error } = await supabase
        .from("enrollments")
        .select("course_id, course_title, progress, status, created_at")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setEnrolledCourses(data.map(item => ({
          id: item.course_id,
          title: item.course_title,
          progress: item.progress || 0,
          status: item.status || "In Progress",
          date: new Date(item.created_at).toLocaleDateString()
        })));
      }
      data.forEach(course => {
      if (course.progress === 100) {
        // You can trigger a visual toast/notification here
        console.log(`Certificate available for: ${course.course_title}`);
      }
    });
    } catch (err) {
      console.error("Error fetching enrollments:", err.message);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // -- EFFECTS --
  useEffect(() => {
    if (!user) return;

    fetchEnrollments();

    // Listen for custom events from the Courses page
    const refresh = () => fetchEnrollments();
    window.addEventListener("progress-updated", refresh);

    return () => {
      window.removeEventListener("progress-updated", refresh);
    };
  }, [user, fetchEnrollments]);

  // Route Guard
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // -- HANDLERS --
  const handleUnenroll = async (courseId) => {
    try {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", courseId);

      if (error) throw error;

      setEnrolledCourses(prev => prev.filter(c => c.id !== courseId));
      setShowConfirm(null);
    } catch (err) {
      alert("Failed to unenroll: " + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const name = user?.user_metadata?.name || user?.email?.split("@")[0] || "Learner";

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] dark:bg-[#0B0E14]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-white">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-400/10 dark:bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      {/* SIDEBAR NAVIGATION */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="hidden lg:flex w-72 flex-col p-8 z-30 bg-white/80 dark:bg-[#0F121A]/90 backdrop-blur-2xl border-r border-purple-100 dark:border-white/5 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Sparkles size={22} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                SkillHer
              </h1>
            </div>

            <nav className="space-y-3 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 ml-2">
                Main Menu
              </p>
              <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active onClick={() => navigate("/dashboard")} />
              <NavItem icon={<BookOpen size={20} />} label="Learning Lab" onClick={() => navigate("/See-Courses")} />
              <NavItem icon={<Briefcase size={20} />} label="Career Hub" onClick={() => navigate("/jobs")} />
              <NavItem icon={<Award size={20} />} label="Certificates" onClick={() => navigate("/dashboard")} />
              
              <div className="pt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 ml-2">
                  Account & Tools
                </p>
                <NavItem icon={<User size={20} />} label="Profile Settings" onClick={() => navigate("/profile")} />
                <NavItem icon={<Bell size={20} />} label="Notifications" badge={notifications} onClick={() => setNotifications(0)} />
                <NavItem icon={<Settings size={20} />} label="Preferences" onClick={() => navigate("/settings")} />
              </div>
            </nav>

            {/* Sidebar Profile Card */}
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm truncate">{name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 z-20 overflow-y-auto custom-scrollbar">
        {/* ACHIEVEMENT NOTIFICATION */}
<AnimatePresence>
  {/* FIX: We use 'c' as the iterator variable for the .some() check */}
  {enrolledCourses.some(c => Number(c.progress) >= 100) && (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 p-4 bg-gradient-to-r from-amber-500 to-orange-400 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-orange-500/20 sticky top-4 z-[60]"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Award size={24} className="animate-pulse" />
        </div>
        <div>
          <p className="font-black text-sm uppercase tracking-wider">Achievement Unlocked!</p>
          <p className="text-xs opacity-90">You have earned a new certificate. Check your courses below.</p>
        </div>
      </div>
      <Sparkles size={20} className="mr-2" />
    </motion.div>
  )}
</AnimatePresence>
        {/* Top Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-black"
            >
              Welcome back, <span className="text-purple-600 dark:text-purple-400">{name}</span> 👋
            </motion.h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              You've completed <span className="text-slate-900 dark:text-white font-bold">85%</span> of your weekly goals. Keep going!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all">
              <Calendar size={20} />
            </button>
            <button className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all relative">
              <Bell size={20} />
              {notifications > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-pink-500 border-2 border-white dark:border-[#0B0E14] rounded-full"></span>}
            </button>
            <button 
              onClick={() => navigate("/See-Courses")}
              className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-xl hover:bg-purple-600 dark:hover:bg-purple-500 dark:hover:text-white transition-all transform hover:-translate-y-1"
            >
              Start Learning
            </button>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Courses Active" 
            value={enrolledCourses.length} 
            icon={<BookOpen size={24} />} 
            color="bg-purple-500" 
            trend="+2 this month"
          />
          <StatCard 
            title="Learning Hours" 
            value="42.5" 
            icon={<Clock size={24} />} 
            color="bg-blue-500" 
            trend="Top 10% student"
          />
          <StatCard 
            title="Applied Roles" 
            value="12" 
            icon={<Briefcase size={24} />} 
            color="bg-pink-500" 
            trend="3 Interviews pending"
          />
          <StatCard 
            title="Skill Points" 
            value="1,280" 
            icon={<TrendingUp size={24} />} 
            color="bg-orange-500" 
            trend="New Level: Pro"
          />
        </div>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="grid xl:grid-cols-3 gap-10">
          
          {/* Left Column: Learning Progress */}
          <div className="xl:col-span-2 space-y-10">
            
            <GlassCard 
              title="Continuous Learning" 
              icon={<BookOpen className="text-purple-500" />}
              action={
                <button 
                  onClick={() => navigate("/See-Courses")}
                  className="flex items-center gap-1 text-xs font-black text-purple-600 uppercase tracking-widest hover:underline"
                >
                  View Library <ChevronRight size={14} />
                </button>
              }
            >
              {fetchLoading ? (
                <div className="py-10 text-center text-slate-400">Syncing with database...</div>
              ) : enrolledCourses.length > 0 ? (
                <div className="grid gap-6 mt-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="relative group p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-transparent hover:border-purple-200 dark:hover:border-purple-500/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-white/5">
                            <BookOpen size={20} className="text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{course.title}</h4>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">{course.status} • Joined {course.date}</p>
                          </div>  
                        </div>
                        <button 
                          onClick={() => setShowConfirm(course.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-2">
  <div className="flex justify-between text-xs font-bold">
    <span className="text-slate-500 italic">Course Completion</span>
    <span className="text-purple-600">{course.progress}%</span>
  </div>
  
  <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${course.progress}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
    />
  </div>

  {/* NEW REPLACEMENT LOGIC */}
{/* UPDATED CERTIFICATE BUTTON */}
{Number(course.progress) >= 100 ? (
  <motion.button 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    onClick={() => {
      // 1. Get the User's Name
      const userName = user?.user_metadata?.name || name || "Learner";
      
      // 2. Logic to determine the Partner Company based on course title
      let partner = "Industry Expert"; 
      const title = course.title.toLowerCase();
      
      if (title.includes("google")) partner = "Google";
      else if (title.includes("ibm")) partner = "IBM";
      else if (title.includes("meta") || title.includes("facebook")) partner = "Meta";
      else if (title.includes("microsoft")) partner = "Microsoft";
      else if (title.includes("amazon") || title.includes("aws")) partner = "AWS";
      else partner = "SkillHer Partner"; // Default partner

      // 3. Trigger the enhanced generator
      generateCertificate(userName, course.title, partner);
    }}
    className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-black shadow-lg hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1"
  >
    <Award size={18} className="animate-bounce" /> 
    DOWNLOAD PREMIUM CERTIFICATE
  </motion.button>
) : (
  <button 
    onClick={() => window.open(course.link || "#", "_blank")}
    className="mt-4 w-full py-3 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-purple-600 hover:text-white transition-all duration-300"
  >
    Continue Learning
  </button>
)}
</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <BookOpen size={28} className="text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-400">No active courses found</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">Build your skills by enrolling in our curated industry-level courses.</p>
                  <button 
                    onClick={() => navigate("/See-Courses")}
                    className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20"
                  >
                    Explore Catalog
                  </button>
                </div>
              )}
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard title="Active Services" icon={<Sparkles className="text-blue-500" />}>
                <div className="space-y-4">
                  <ServiceRow title="Resume Makeover" status="In Review" price="₹1,200" />
                  <ServiceRow title="Career Mentorship" status="Active" price="₹4,500" />
                  <button className="w-full py-3 rounded-xl border border-dashed border-slate-300 dark:border-white/20 text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                    + Register New Service
                  </button>
                </div>
              </GlassCard>

              <GlassCard title="Learning Streaks" icon={<TrendingUp className="text-orange-500" />}>
                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <p className="text-2xl font-black text-orange-600">14 Days</p>
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Personal Best!</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-500">Keep it up!</div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Column: Applications & Activity */}
          <div className="space-y-10">
            
            <GlassCard title="Job Applications" icon={<Briefcase className="text-pink-500" />}>
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                <JobRow company="Apple Inc." role="UI Intern" status="Shortlisted" date="2d ago" color="bg-emerald-500" />
                <JobRow company="Google" role="Frontend Developer" status="Under Review" date="5d ago" color="bg-blue-500" />
                <JobRow company="Stripe" role="Product Designer" status="Applied" date="1w ago" color="bg-slate-400" />
              </div>
              <button 
                onClick={() => navigate("/jobs")}
                className="w-full mt-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all border border-slate-200 dark:border-white/10"
              >
                Find New Opportunities <ChevronRight size={16} />
              </button>
            </GlassCard>

            <GlassCard title="Community Highlights" icon={<MessageSquare className="text-indigo-500" />}>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="user" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-800 dark:text-white">Sarah Jenkins <span className="font-normal text-slate-400">posted in</span> Design</p>
                    <p className="text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 italic">"Just finished the Advanced Figma course! The auto-layout module was a game changer..."</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-20 rounded-xl bg-purple-100 dark:bg-purple-900/30"></div>
                  <div className="flex-1 h-20 rounded-xl bg-pink-100 dark:bg-pink-900/30"></div>
                </div>
              </div>
            </GlassCard>

            {/* Support/Upgrade Card */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">Upgrade to Pro</h3>
                <p className="text-purple-100 text-sm mb-6 leading-relaxed">Get unlimited access to advanced mentorship and placement assistance.</p>
                <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
                  UPGRADE NOW
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER AREA */}
        <footer className="mt-20 py-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <p>Your connection is secure and encrypted.</p>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-purple-500 transition-colors">Help Center</a>
            <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-500 transition-colors flex items-center gap-1">
              Made with <Heart size={14} className="text-pink-500 fill-pink-500" /> by SkillHer Team
            </a>
          </div>
        </footer>

      </main>

      {/* CONFIRMATION OVERLAY MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#121826] p-10 rounded-[2.5rem] max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-red-50 dark:border-red-900/20 text-center"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Confirm Unenrollment</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                Are you sure you want to leave this course? All your earned progress and saved notes will be permanently removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-black hover:bg-slate-200 transition-all"
                >
                  KEEP LEARNING
                </button>
                <button 
                  onClick={() => handleUnenroll(showConfirm)}
                  className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-black shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all"
                >
                  YES, REMOVE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */

/**
 * NavItem Component
 * Handles the sidebar link styling and state
 */
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between p-4 rounded-2xl cursor-pointer group
        transition-all duration-300 transform active:scale-95
        ${active
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/20"
          : "text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-white/5 hover:text-purple-600 dark:hover:text-purple-400"}
      `}
    >
      <div className="flex items-center gap-4">
        <span className={`${active ? "text-white" : "group-hover:scale-110 transition-transform text-slate-400 group-hover:text-purple-500"}`}>
          {icon}
        </span>
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {active && <motion.div layoutId="activeInd" className="w-1.5 h-1.5 bg-white rounded-full shadow-glow" />}
    </div>
  );
}

/**
 * StatCard Component
 * Displays key metrics at the top of the dashboard
 */
function StatCard({ title, value, icon, color, trend }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
        <div className="text-[10px] font-black text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
          LIVE
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
        <p className="text-[11px] font-bold text-emerald-500 mt-2 flex items-center gap-1">
          <TrendingUp size={12} /> {trend}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * GlassCard Component
 * Reusable container with glassmorphism effects
 */
function GlassCard({ title, icon, action, children }) {
  return (
    <section className="bg-white/70 dark:bg-[#0F121A]/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white dark:border-white/5 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="flex items-center gap-3 text-xl font-black text-slate-800 dark:text-white">
          <span className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl">{icon}</span> {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/**
 * JobRow Component
 * Simple row display for job applications
 */
function JobRow({ company, role, status, date, color }) {
  return (
    <div className="flex items-center justify-between py-5 group cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400">
          {company.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-purple-500 transition-colors">{company}</h4>
          <p className="text-xs text-slate-400 font-medium">{role} • {date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{status}</span>
      </div>
    </div>
  );
}

/**
 * ServiceRow Component
 */
function ServiceRow({ title, status, price }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-500 rounded-full" />
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{status}</p>
        </div>
      </div>
      <p className="text-lg font-black text-emerald-500">{price}</p>
    </div>
  );
}