import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Search, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Layers, 
  Target 
} from "lucide-react";
import { courses } from "../data/courses";
import { supabase } from "../supabaseClient";

// 1. DOMAINS AND ICONS DEFINITIONS
const domains = ["All", "Tech", "Art", "Cooking", "Knitting", "Music"];
const domainIcons = {
  All: <Search size={16} />,
  Tech: <BookOpen size={16} />,
  Art: <Star size={16} />,
  Cooking: <Users size={16} />,
  Music: <Clock size={16} />,
  Knitting: <ExternalLink size={16} />
};

export default function CoursesPage() {
  // 2. STATE MANAGEMENT
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);

  // 3. ENROLLMENT LOGIC (VERSION A)
  const enrollCourse = async (course) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: course.id,
      course_title: course.title,
      progress: 0,
    });

    if (error) {
      if (error.code === "23505") {
        alert("You are already enrolled in this course");
      } else {
        alert("Enrollment failed");
      }
      return;
    }

    alert("Enrolled successfully");
    window.dispatchEvent(new Event("progress-updated"));
  };

  // 4. ENROLLMENT LOGIC (VERSION B - DETAILED)
 const handleEnroll = async (course) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  // Use maybeSingle() instead of single() to avoid erroring on empty results
  const { data: existing, error: checkError } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .maybeSingle(); 

  if (existing) {
    alert("You are already enrolled in this course!");
    return;
  }

  const { error: insertError } = await supabase.from("enrollments").insert({
    user_id: user.id,
    course_id: course.id,
    course_title: course.title,
    progress: 10,
    status: "learning",
  });

  if (insertError) {
    console.error("Enrollment failed:", insertError.message);
    alert("Enrollment failed: " + insertError.message);
  } else {
    alert("Successfully enrolled!");
    window.dispatchEvent(new Event("progress-updated"));
  }
};

  // 5. PROGRESS TRACKING LOGIC
  const increaseProgress = async (course) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to track progress");
      return;
    }

    // Check for existing enrollment to decide INSERT or UPDATE
    const { data: enrollment, error: fetchError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch Error:", fetchError);
      return;
    }

    if (!enrollment) {
      // Create new record if user wasn't enrolled yet but clicked the link
      const { error: insertError } = await supabase.from("enrollments").insert({
        user_id: user.id,
        course_id: course.id,
        course_title: course.title,
        progress: 10,
        status: "learning",
      });
      if (insertError) console.error("Enrollment failed:", insertError);
    } else {
      // Increment existing progress
      const currentVal = enrollment.progress || 0;
      const newVal = Math.min(currentVal + 10, 100);
      
      const { error: updateError } = await supabase
        .from("enrollments")
        .update({ progress: newVal })
        .eq("id", enrollment.id);
        
      if (updateError) console.error("Update failed:", updateError);
    }

    // Broadcast change for Real-time Dashboard updates
    window.dispatchEvent(new Event("progress-updated"));
  };

  // 6. FILTERING LOGIC
  const filteredCourses =
    activeDomain === "All"
      ? courses.filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : courses.filter((c) => c.domain === activeDomain).filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // 7. UI TOGGLE LOGIC
  const toggleExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 p-6 relative">
      
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2], 
            rotate: [90, 0, 90],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-pink-500/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-12"
        >
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-purple-600 uppercase bg-purple-100 rounded-full dark:bg-purple-900/30">
            Learning Path 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-6">
            Master Your Skills
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Choose from hundreds of professional courses curated by industry experts. Your journey to excellence starts here.
          </p>
        </motion.header>

        {/* SEARCH AND FILTER TOOLS */}
        <div className="flex flex-col gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-3xl mx-auto w-full group"
          >
            <Search 
              size={24} 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" 
            />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-900 dark:text-slate-100 text-xl shadow-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`relative group px-8 py-3 rounded-2xl text-base font-bold transition-all duration-300 ${
                  activeDomain === d
                    ? "text-white shadow-2xl scale-105"
                    : "text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50"
                }`}
              >
                {activeDomain === d && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="flex items-center gap-3 relative z-10">
                  {domainIcons[d]}
                  {d}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* COURSES DISPLAY GRID */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={course.id}
                className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(120,40,200,0.15)] transition-all duration-500"
              >
                {/* Visual Decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-pink-500" />
                
                <div className="p-8 flex flex-col h-full">
                  {/* Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 dark:bg-purple-600 rounded-full">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">{course.rating || "4.9"}</span>
                    </div>
                  </div>

                  {/* Info Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                      {course.title}
                    </h3>
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-4">
                      <Layers size={14} /> {course.academy}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={16} className="text-purple-500" />
                        <span>{course.duration || "Self-Paced"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={16} className="text-pink-500" />
                        <span>{course.enrolled || "2.5k"} Students</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 line-clamp-3">
                    {course.description}
                  </p>

                  {/* EXPANDABLE DETAILS AREA */}
                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pb-6 border-t border-slate-100 dark:border-slate-800">
                          <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                            <Target size={16} className="text-purple-600" /> Curriculum Highlights
                          </h4>
                          <ul className="space-y-3 mb-6">
                            {(course.learningOutcomes || [
                              "Comprehensive understanding of core concepts",
                              "Hands-on project experience with feedback",
                              "Access to student community and forums",
                              "Certificate of completion upon graduation"
                            ]).map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                                <Award size={14} className="mt-1 text-pink-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2">
                            <p className="text-xs text-slate-500 italic">
                              <strong>Lead Instructor:</strong> {course.instructor || "Certified Professional"}
                            </p>
                            <p className="text-xs text-slate-500 italic">
                              <strong>Prerequisites:</strong> {course.prerequisites || "Beginner Friendly"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INTERACTION AREA */}
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => toggleExpand(course.id)}
                        className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-purple-600 transition-colors px-2"
                      >
                        {expandedCourse === course.id ? (
                          <><ChevronUp size={20} /> LESS</>
                        ) : (
                          <><ChevronDown size={20} /> INFO</>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleEnroll(course)}
                        className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg"
                      >
                        Enroll Now
                      </button>
                    </div>

                    <a
                      href={course.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={async (e) => {
                        e.preventDefault();
                        await increaseProgress(course);
                        window.open(course.link, "_blank");
                      }}
                      className="group/btn flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
                    >
                      <BookOpen size={20} className="group-hover/btn:rotate-12 transition-transform" />
                      VIEW FULL COURSE
                      <ExternalLink size={18} className="opacity-50" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border-2 border-dashed border-slate-200 dark:border-slate-800"
          >
            <Search size={64} className="mx-auto text-slate-300 mb-6" />
            <h2 className="text-2xl font-bold text-slate-400">No courses match your search criteria</h2>
            <button 
              onClick={() => { setSearchTerm(""); setActiveDomain("All"); }}
              className="mt-6 text-purple-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}