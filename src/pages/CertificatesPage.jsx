import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { 
  Award, Download, Share2, ArrowLeft,
  Calendar, Trophy, Sparkles, ExternalLink, Star, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateCertificate } from "../utils/CertificateGenerator";

export default function CertificatesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchCompletedCourses();
  }, [user, navigate]);

  const fetchCompletedCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("enrollments")
        .select("course_id, course_title, progress, created_at")
        .eq("user_id", user.id)
        .gte("progress", 100)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setCompletedCourses(data.map(item => ({
          id: item.course_id,
          title: item.course_title,
          completedDate: new Date(item.created_at).toLocaleDateString(),
          progress: item.progress
        })));
      }
    } catch (error) {
      console.error("Error fetching completed courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPartnerName = (courseTitle) => {
    const title = courseTitle.toLowerCase();
    if (title.includes("google")) return "Google";
    if (title.includes("ibm")) return "IBM";
    if (title.includes("meta") || title.includes("facebook")) return "Meta";
    if (title.includes("microsoft")) return "Microsoft";
    if (title.includes("amazon") || title.includes("aws")) return "AWS";
    return "SkillHer Partner";
  };

  const handleDownload = (course) => {
    const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Learner";
    const partner = getPartnerName(course.title);
    generateCertificate(userName, course.title, partner);
  };

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
    <div className="min-h-screen relative overflow-hidden bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-white">
      
      {/* BACKGROUND DECORATION - Same as Dashboard */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-400/10 dark:bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-black"
              >
                <Trophy className="inline w-10 h-10 mb-2 mr-3 text-amber-500" />
                My Certificates
              </motion.h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Your achievements and professional credentials
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {completedCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-lg">
                  <Award size={24} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Certificates</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {completedCourses.length}
                </h3>
                <p className="text-[11px] font-bold text-emerald-500 mt-2 flex items-center gap-1">
                  <Sparkles size={12} /> All verified
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500 text-white shadow-lg">
                  <Trophy size={24} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion Rate</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  100%
                </h3>
                <p className="text-[11px] font-bold text-emerald-500 mt-2">Perfect record</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-pink-500 text-white shadow-lg">
                  <Star size={24} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Achievement Level</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Pro
                </h3>
                <p className="text-[11px] font-bold text-emerald-500 mt-2">Elite status</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Certificates Grid or Empty State */}
        {completedCourses.length === 0 ? (
          // Empty State
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-20 p-16 rounded-[2.5rem] text-center bg-white/70 dark:bg-[#0F121A]/60 backdrop-blur-xl border border-white dark:border-white/5 shadow-sm"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center"
            >
              <Award className="w-16 h-16 text-slate-300 dark:text-slate-600" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              No Certificates Yet
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Complete your first course to earn a professional certificate and showcase your skills!
            </p>
            
            <button
              onClick={() => navigate("/See-Courses")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg shadow-xl hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1"
            >
              <Sparkles className="inline w-5 h-5 mr-2 mb-1" />
              Explore Courses
            </button>
          </motion.div>
        ) : (
          // Certificates Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {completedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-[2rem] overflow-hidden bg-white/70 dark:bg-[#0F121A]/60 backdrop-blur-xl border border-white dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
                >
                  {/* Certificate Preview */}
                  <div className="relative h-48 p-6 flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                      <div className="absolute top-0 right-0 w-1 h-full bg-amber-500"></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <Award className="w-16 h-16 mx-auto mb-3 text-amber-600 dark:text-amber-400" />
                      <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-300">
                        Certificate of Achievement
                      </p>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/50"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500/50"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500/50"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/50"></div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {course.completedDate}</span>
                    </div>

                    <div className="mb-4 px-3 py-2 rounded-lg inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      <Trophy className="w-4 h-4" />
                      <span className="text-xs font-bold">Verified by {getPartnerName(course.title)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(course)}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                      >
                        <Download className="inline w-4 h-4 mr-2 mb-0.5" />
                        Download
                      </button>
                      
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `Certificate - ${course.title}`,
                              text: `I've completed ${course.title} and earned a certificate!`,
                            });
                          }
                        }}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA */}
        {completedCourses.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-[2rem] text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl"
          >
            <h3 className="text-2xl font-black mb-3">
              Keep Learning, Keep Growing
            </h3>
            <p className="mb-6 text-purple-100">
              Continue your journey and earn more professional certificates
            </p>
            <button
              onClick={() => navigate("/See-Courses")}
              className="px-8 py-4 rounded-xl bg-white text-purple-600 font-black transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <BookOpen className="inline w-4 h-4 mr-2 mb-0.5" />
              Browse More Courses
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}