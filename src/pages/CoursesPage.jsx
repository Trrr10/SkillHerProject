import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, BookOpen, Clock, Users, Star, ChevronDown, ChevronUp } from "lucide-react";
import { courses } from "../data/courses";
import { supabase } from "../supabaseClient";

// FIXED: Defined domains array
const domains = ["All", "Tech", "Art", "Cooking", "Knitting", "Music"];
const domainIcons = {
  All: <Search size={16} />,
  Tech: <BookOpen size={16} />,
  Art: <Star size={16} />, // Or use a Palette icon
  Cooking: <Users size={16} />, // Or use a Utensils icon
  Music: <Clock size={16} />, // Or use a Music icon
  Knitting: <ExternalLink size={16} />
};



export default function CoursesPage() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);

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
const toggleExpand = (courseId) => {
  setExpandedCourse(prev => (prev === courseId ? null : courseId));
};
const handleViewCourse = async (course) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from("course_progress")
    .select("progress")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
      .maybeSingle();

  if (!data) return;

  await supabase
    .from("course_progress")
    .update({
      progress: Math.min(data.progress + 5, 100)
    })
    .eq("user_id", user.id)
    .eq("course_id", course.id);
};



 const handleEnroll = async (course) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert("Please log in first");

  // 1️⃣ Check if already enrolled
  const { data: existing } = await supabase
    .from("course_progress")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .single();

  if (existing) {
    alert("You are already enrolled in this course!");
    return;
  }

  // 2️⃣ Insert initial progress
  await supabase.from("course_progress").insert({
    user_id: user.id,
    course_id: course.id,
    progress: 10
  });

  alert(`Enrolled in ${course.title}!`);
};


  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 p-6">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Explore Courses
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Discover and enroll in courses to boost your skills and career.
          </p>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-lg shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </motion.div>

        {/* Domain Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeDomain === d
                  ? "text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              }`}
            >
              {activeDomain === d && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{d}</span>
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: index * 0.1 }}
                key={course.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                {/* Course Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {course.academy}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration || "4 weeks"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{course.enrolled || "1.2k"} enrolled</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500" />
                          <span>{course.rating || "4.8"}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                            What You'll Learn:
                          </h4>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 mb-4">
                            {course.learningOutcomes?.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                {outcome}
                              </li>
                            )) || (
                              <>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                  Master fundamental concepts and advanced techniques.
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                  Gain hands-on experience with real-world projects.
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                  Build a portfolio to showcase your skills.
                                </li>
                              </>
                            )}
                          </ul>
                          <p className="text-sm text-slate-500 dark:text-slate-500">
                            <strong>Instructor:</strong> {course.instructor || "Expert Instructor"}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                            <strong>Prerequisites:</strong> {course.prerequisites || "None required"}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(course.id)}
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                    >
                      {expandedCourse === course.id ? (
                        <>
                          <ChevronUp size={16} />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Learn More
                        </>
                      )}
                    </button>
 <a
  href={course.link}
  target="_blank"
  rel="noreferrer"
  onClick={(e) => {
    e.preventDefault();
    handleViewCourse(course);
    window.open(course.link, "_blank");
  }}
>

  <BookOpen size={16} />
  See the Course in Detail
</a>

            <button
  onClick={() => handleEnroll(course)}
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
>
  <BookOpen size={16} />
  Enroll Now
</button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-slate-500 dark:text-slate-400">
              No courses found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}