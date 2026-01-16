import React, { useState } from "react";
import { Briefcase, TrendingUp, Target, CheckCircle2, Sparkles, MapPin, DollarSign, Clock } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import JobDetailsModal from "../components/JobDetailsModal";
const ALL_SKILLS = [
  // Tech & Development
  "JavaScript", "React", "Python", "Node.js", "UI/UX Design", "Figma", "Data Analysis", "SQL", "AWS",
  // Creative & Design
  "Graphic Design", "Video Editing", "Adobe Photoshop", "Illustration", "Animation", "3D Modeling",
  // Marketing & Content
  "Content Writing", "SEO", "Social Media Marketing", "Email Marketing", "Copywriting", "Brand Strategy",
  // Business & Finance
  "Excel", "Financial Analysis", "Accounting", "Business Development", "Project Management", "Sales",
  // Other Professional
  "Customer Support", "HR", "Legal Research", "Event Planning", "Translation", "Teaching"
];
const SKILL_CATEGORIES = {
  "Tech & Development": [
    "JavaScript", "React", "Python", "Node.js", "SQL", "AWS", 
    "Data Analysis", "Machine Learning", "AI/Deep Learning", 
    "DevOps", "Cybersecurity", "Mobile Development", 
    "Cloud Computing", "Blockchain", "Game Development"
  ],
  
  "Design & Creative": [
    "UI/UX Design", "Figma", "Graphic Design", "Video Editing", 
    "Adobe Photoshop", "Illustration", "Animation", "3D Modeling", 
    "Fashion Design", "Interior Design", "Product Design", 
    "Photography", "Industrial Design"
  ],
  
  "Marketing & Content": [
    "Content Writing", "SEO", "Social Media Marketing", 
    "Email Marketing", "Copywriting", "Brand Strategy"
  ],
  
  "Business & Finance": [
    "Excel", "Financial Analysis", "Accounting", 
    "Business Development", "Project Management", "Sales", 
    "Investment Banking", "Financial Planning", 
    "Tax Planning", "Auditing", "Corporate Finance", "Stock Trading"
  ],
  
  "Engineering": [
    "Mechanical Engineering", "Civil Engineering", "Electrical Engineering"
  ],
  
  "Architecture": [
    "Architecture", "Urban Planning", "CAD/AutoCAD"
  ],
  
  "Healthcare": [
    "Nursing", "Pharmacy"
  ],
  
  "Legal": [
    "Legal Research", "Contract Law", "Corporate Law"
  ],
  
  "Hospitality": [
    "Hotel Management", "Event Management"
  ],
  
  "Media & Entertainment": [
    "Film Production", "Journalism", "Public Relations"
  ],
  
  "Science & Research": [
    "Data Science", "Research & Development"
  ],
  
  "Other Professional": [
    "Customer Support", "HR", "Translation", "Teaching", "Marketing"
  ]
};
const TAG_COLORS = {
  "Tech": "from-blue-500 to-cyan-500",
  "Design": "from-purple-500 to-pink-500",
  "Content": "from-orange-500 to-amber-500",
  "Marketing": "from-rose-500 to-pink-500",
  "Analytics": "from-emerald-500 to-teal-500",
  "Business": "from-indigo-500 to-blue-500",
  "Creative": "from-fuchsia-500 to-purple-500"
};

export default function JobsPage() {
  
const { user } = useAuth();
const [allSkills, setAllSkills] = useState([]);
const [jobs, setJobs] = useState([]);
const [selectedSkills, setSelectedSkills] = useState([]);
const [activeCategory, setActiveCategory] = useState("All");
const [selectedJob, setSelectedJob] = useState(null);
// Fetch all skills from database
useEffect(() => {
  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("id, name, category");

    if (!error) setAllSkills(data);
  };

  fetchSkills();
}, []);

// Fetch user's selected skills
useEffect(() => {
  if (!user) return;

  const fetchUserSkills = async () => {
    const { data, error } = await supabase
      .from("user_skills")
      .select("skill_id")
      .eq("user_id", user.id);

    if (!error) {
      setSelectedSkills(data.map(d => d.skill_id));
    }
  };

  fetchUserSkills();
}, [user]);

// Fetch jobs based on selected skills
// Fetch jobs based on selected skills
useEffect(() => {
  const fetchJobs = async () => {
    if (!user) {
      // If no user, just show random jobs
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .limit(9);
      setJobs(data || []);
      return;
    }

    if (selectedSkills.length < 3) {
      // Show random jobs with application status
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .limit(9);

      // Fetch user's applications
      const { data: applicationsData } = await supabase
        .from("applications")
        .select("job_id, status")
        .eq("user_id", user.id);

      // Merge jobs with application status
      const jobsWithStatus = (jobsData || []).map(job => ({
        ...job,
        applicationStatus: applicationsData?.find(app => app.job_id === job.id)?.status || null
      }));

      // Sort: applied jobs first, then others
      const sortedJobs = jobsWithStatus.sort((a, b) => {
        if (a.applicationStatus && !b.applicationStatus) return -1;
        if (!a.applicationStatus && b.applicationStatus) return 1;
        return 0;
      });

      setJobs(sortedJobs);
      return;
    }

    // Fetch jobs matching skills
    const { data, error } = await supabase
      .from("jobs")
      .select(`
        *,
        job_skills!inner ( skill_id )
      `)
      .in("job_skills.skill_id", selectedSkills);

    if (!error && data) {
      const uniqueJobs = Array.from(
        new Map(data.map(job => [job.id, job])).values()
      );

      // Fetch user's applications
      const { data: applicationsData } = await supabase
        .from("applications")
        .select("job_id, status")
        .eq("user_id", user.id);

      // Merge jobs with application status
      const jobsWithStatus = uniqueJobs.map(job => ({
        ...job,
        applicationStatus: applicationsData?.find(app => app.job_id === job.id)?.status || null
      }));

      // Sort: applied jobs first, then others
      const sortedJobs = jobsWithStatus.sort((a, b) => {
        if (a.applicationStatus && !b.applicationStatus) return -1;
        if (!a.applicationStatus && b.applicationStatus) return 1;
        return 0;
      });

      setJobs(sortedJobs);
    } else {
      setJobs([]);
    }
  };

  fetchJobs();
}, [selectedSkills, user]);

const toggleSkill = async (skillId) => {
  if (!user) return;

  if (selectedSkills.includes(skillId)) {
    await supabase
      .from("user_skills")
      .delete()
      .eq("user_id", user.id)
      .eq("skill_id", skillId);

    setSelectedSkills(selectedSkills.filter(s => s !== skillId));
  } else {
    await supabase
      .from("user_skills")
      .insert({
        user_id: user.id,
        skill_id: skillId
      });

    setSelectedSkills([...selectedSkills, skillId]);
  }
};

const applyToJob = async (jobId) => {
  if (!user) return;
  await supabase.from("applications").insert({
    user_id: user.id,
    job_id: jobId,
    status: "applied"
  });
};

const hasMinSkills = selectedSkills.length >= 3;

const displayedSkills =
  activeCategory === "All"
    ? allSkills
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#D6C8FF] to-[#C7B5FF]
">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float-slower"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-float-reverse"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex items-start gap-4 mb-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-2">
                Discover Your Next Opportunity
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Browse jobs that match your skills. Select at least 3 skills to unlock personalized recommendations tailored just for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">

        {/* SKILLS SECTION */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Skills
              </h2>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedSkills.length >= num
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-sm font-semibold ${
                hasMinSkills ? "text-emerald-600" : "text-gray-500"
              }`}>
                {selectedSkills.length >= 3 ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready to apply
                  </span>
                ) : (
                  `${selectedSkills.length}/3 skills selected`
                )}
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/80 text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-md backdrop-blur-sm"
              }`}
            >
              All Skills
            </button>
            {Object.keys(SKILL_CATEGORIES).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/80 text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-md backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-purple-100">
            <div className="flex flex-wrap gap-3">
              {displayedSkills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold
  transition-all duration-300 relative
  ${
    selectedSkills.includes(skill.id)
      ? `
        bg-gradient-to-r from-purple-600 to-pink-600 text-white
        scale-110
        shadow-[0_0_25px_rgba(168,85,247,0.9)]
        ring-2 ring-purple-400
      `
      : `
        bg-white text-gray-700 border border-gray-200
        hover:bg-purple-50
        hover:text-purple-700
        hover:border-purple-500
        hover:scale-110
        hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]
      `
  }
`}

                >
                  {selectedSkills.includes(skill.id) && "✓ "}
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Encouragement Message */}
          {selectedSkills.length > 0 && selectedSkills.length < 3 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <p className="text-sm text-amber-800 font-medium">
                Great start! Add {3 - selectedSkills.length} more {selectedSkills.length === 2 ? 'skill' : 'skills'} to unlock personalized job recommendations.
              </p>
            </div>
          )}
        </section>

        {/* TRENDING JOBS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Recently Posted</h2>
            <span className="text-sm text-gray-500 font-medium">Fresh opportunities for you</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map(job => (
              <div
                key={job.id}
                className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Job Header */}
                {/* Job Header */}
<div className="flex justify-between items-start mb-4">
  <div className="flex gap-2 items-center">
    <span className={`px-3 py-1 bg-gradient-to-r ${TAG_COLORS[job.tag]} text-white text-xs font-bold rounded-full shadow-sm`}>
      {job.tag}
    </span>
    {job.applicationStatus && (
      <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
        {job.applicationStatus === 'applied' && 'Applied'}
        {job.applicationStatus === 'shortlisted' && 'Shortlisted'}
        {job.applicationStatus === 'rejected' && 'Rejected'}
      </span>
    )}
  </div>
  <span className="text-xs text-gray-800 font-medium flex items-center gap-1">
    <Clock className="w-3 h-3" />
    {job.posted_time}
  </span>
</div>
                
                {/* Job Title & Company */}
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-3">{job.company}</p>
                
                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{job.location}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Apply Button */}
{/* Apply Button with Status */}
{job.applicationStatus ? (
  <div className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center ${
    job.applicationStatus === 'applied' 
      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
      : job.applicationStatus === 'shortlisted'
      ? 'bg-green-100 text-green-700 border-2 border-green-300'
      : job.applicationStatus === 'rejected'
      ? 'bg-red-100 text-red-700 border-2 border-red-300'
      : 'bg-gray-100 text-gray-700'
  }`}>
    {job.applicationStatus === 'applied' && '✓ Applied'}
    {job.applicationStatus === 'shortlisted' && '🎉 Shortlisted'}
    {job.applicationStatus === 'rejected' && '✗ Not Selected'}
  </div>
) : (
  <button
    onClick={() => setSelectedJob(job)}
    disabled={!hasMinSkills}
    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
      hasMinSkills
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }`}
  >
    {hasMinSkills ? "Apply Now" : "🔒 Select 3 skills to apply"}
  </button>
)}
              </div>
            ))}
          </div>
          

          {/* Browse Encouragement */}
          {!hasMinSkills && (
            <div className="mt-6 p-5 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">You can browse, but you'll need skills to apply</h4>
                  <p className="text-sm text-purple-700">
                    Select at least 3 skills above to unlock the ability to apply for jobs. This helps us match you with the right opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* PERSONALIZED JOBS */}
        {hasMinSkills && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Matched For You</h2>
            </div>

            <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 border-2 border-purple-200 rounded-3xl p-8 shadow-xl">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-white rounded-2xl shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Your profile is ready!
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We're matching you with opportunities based on: 
                    <span className="font-semibold text-purple-700"> {selectedSkills.join(", ")}</span>
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl text-sm text-gray-600 border border-purple-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Advanced matching algorithm
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(-8deg); }
          66% { transform: translate(30px, -20px) rotate(8deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.1); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(25px, 35px) rotate(-6deg); }
          66% { transform: translate(-30px, -25px) rotate(6deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 30s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 22s ease-in-out infinite;
        }
      `}</style>
      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          userSkills={selectedSkills}
        />
      )}

    </div>
  );
}
   