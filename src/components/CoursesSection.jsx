import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { courses } from "../data/courses";

// FIXED: Defined domains array
const domains = ["All", "Tech", "Art", "Cooking", "Knitting", "Music"];

export default function CoursesSection() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <section className="mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-8 bg-purple-600 rounded-full" />
        Learn & Upskill
      </h2>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
        />
      </div>

      {/* DOMAIN TABS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDomain(d)}
            className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeDomain === d ? "text-white" : "text-slate-500 hover:text-purple-600"
            }`}
          >
            {activeDomain === d && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute inset-0 bg-purple-600 rounded-full -z-10" 
              />
            )}
            <span className="relative z-10">{d}</span>
          </button>
        ))}
      </div>

      {/* COURSES LIST */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredCourses.slice(0, 3).map((course) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={course.id}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-purple-300 transition-all shadow-sm"
            >
              <h3 className="font-bold text-sm line-clamp-1">{course.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{course.academy}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded">
                  {course.level}
                </span>
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 group-hover:text-purple-500 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}