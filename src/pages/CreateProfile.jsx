import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Upload, MapPin, User, Link as LinkIcon,
  Briefcase, GraduationCap, CheckCircle2, Github,
  Linkedin, Globe, FileText, AlignLeft, Sparkles,
  Eye, Edit3, Search, Save // Added Save icon
} from "lucide-react";
import CoursesSection from "../components/CoursesSection";

export default function CreateProfile() {
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // Track if user edited

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    bio: "",
    skills: [],
    skillInput: "",
    courses: [],
    courseTitle: "",
    courseProgress: "",
    github: "",
    linkedin: "",
    portfolio: "",
    resume: null,
    photo: null,
  });

  // Effect to show the save button when data changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData]);
   useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFormData(prev => ({
          ...prev,
          name: data.name || "",
          headline: data.headline || "",
          location: data.location || "",
          bio: data.bio || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
        }));
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        name: formData.name,
        headline: formData.headline,
        location: formData.location,
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        updated_at: new Date(),
      });

    setHasChanges(false);
    alert("Profile saved successfully!");
  };

  /* ---------------- LOGIC ---------------- */

  const addSkill = () => {
    const cleanSkill = formData.skillInput.trim();
    if (!cleanSkill) return;
    if (formData.skills.includes(cleanSkill)) return;
    
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, cleanSkill],
      skillInput: "",
    }));
  };

  const addCourse = () => {
    if (formData.courseTitle.trim() && formData.courseProgress >= 0) {
      setFormData({
        ...formData,
        courses: [
          ...formData.courses,
          {
            title: formData.courseTitle.trim(),
            progress: parseInt(formData.courseProgress),
          },
        ],
        courseTitle: "",
        courseProgress: "",
      });
    }
  };

  const calculateStrength = () => {
    let score = 0;
    if (formData.name) score += 15;
    if (formData.headline) score += 10;
    if (formData.bio.length > 20) score += 15;
    if (formData.skills.length >= 3) score += 20;
    if (formData.github || formData.linkedin) score += 20;
    if (formData.resume) score += 20;
    return Math.min(score, 100);
  };

  const strength = calculateStrength();

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 pb-32">
      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {isPreview ? "Profile Preview" : "Create Your Profile"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {isPreview
                ? "This is how recruiters see you"
                : "Build a profile that stands out"}
            </p>
          </div>

          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm font-bold hover:border-purple-500 transition-all"
          >
            {isPreview ? <><Edit3 size={18}/> Edit</> : <><Eye size={18}/> Preview</>}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* MAIN */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!isPreview ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* BASIC INFO */}
                  <Section title="Basic Info" icon={<User size={20}/>}>
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <FloatingInput
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <FloatingInput
                        label="Location"
                        icon={<MapPin size={16}/>}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <FloatingInput
                      label="Professional Headline"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    />

                    <textarea
                      placeholder="Tell your story..."
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full mt-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 mt-4 transition-colors">
                      <Upload className="text-slate-400 dark:text-slate-500" />
                      <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
                        {formData.photo ? formData.photo.name : "Upload Profile Photo"}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setFormData({ ...formData, photo: e.target.files[0] })
                        }
                      />
                    </label>
                  </Section>

                  {/* SOCIAL LINKS */}
                  <Section title="Connect" icon={<LinkIcon size={20}/>}>
                    <div className="space-y-4">
                      <FloatingInput
                        label="GitHub URL"
                        icon={<Github size={16}/>}
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      />
                      <FloatingInput
                        label="LinkedIn URL"
                        icon={<Linkedin size={16}/>}
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      />
                      <FloatingInput
                        label="Portfolio URL"
                        icon={<Globe size={16}/>}
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      />
                    </div>
                  </Section>

                  {/* SKILLS */}
                  <Section title="Expertise" icon={<Briefcase size={20}/>}>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Add skill"
                        value={formData.skillInput}
                        onChange={(e) =>
                          setFormData({ ...formData, skillInput: e.target.value })
                        }
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      />

                      <button
                        onClick={addSkill}
                        className="p-3 rounded-xl bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 transition-colors"
                      >
                        <Plus />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full flex items-center gap-2 text-slate-900 dark:text-slate-100">
                          {skill}
                          <X
                            size={14}
                            className="cursor-pointer text-red-500 hover:scale-120 transition-transform"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                skills: formData.skills.filter((s) => s !== skill),
                              })
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </Section>

                  {/* COURSES */}
                  <Section title="Active Learning" icon={<GraduationCap size={20}/>}>
                    <div className="grid md:grid-cols-5 gap-3">
                      <div className="md:col-span-3">
                        <Input
                          placeholder="Course Title"
                          value={formData.courseTitle}
                          onChange={(e) =>
                            setFormData({ ...formData, courseTitle: e.target.value })
                          }
                        />
                      </div>
                      <Input
                        type="number"
                        placeholder="%"
                        value={formData.courseProgress}
                        onChange={(e) =>
                          setFormData({ ...formData, courseProgress: e.target.value })
                        }
                      />
                      <button
                        onClick={addCourse}
                        className="bg-black dark:bg-slate-700 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </Section>

                  {/* RESUME */}
                  <Section title="Documents" icon={<FileText size={20}/>}>
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Upload className="text-slate-400 dark:text-slate-500" />
                      <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
                        {formData.resume ? formData.resume.name : "Upload Resume"}
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setFormData({ ...formData, resume: e.target.files[0] })
                        }
                      />
                    </label>
                  </Section>
                </motion.div>
              ) : (
                <ProfilePreview formData={formData} />
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR */}
         {/* SIDEBAR */}
<aside className="space-y-6">
  <ProfileStrength strength={strength} />
  
  {/* NEW PRO TIP COMPONENT */}
  <AnimatePresence>
    {!formData.github && !formData.linkedin && !formData.portfolio && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
          <Sparkles size={40} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Pro Tip</span>
          </div>
          
          <h4 className="font-bold text-lg leading-tight mb-2">
            Boost Visibility
          </h4>
          <p className="text-purple-100 text-sm leading-relaxed">
            Profiles with **GitHub** or **LinkedIn** links are <span className="bg-white/20 px-1 rounded">3.5x more likely</span> to be contacted by recruiters.
          </p>
          
          <button 
            onClick={() => document.getElementById('connect-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Add links now <Plus size={14} />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</aside>
        </div>
      </div>

      {/* FLOATING SAVE BUTTON BAR */}
      <AnimatePresence>
        {hasChanges && !isPreview && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 flex justify-center pointer-events-none"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl px-8 py-4 flex items-center gap-6 pointer-events-auto backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-500">Unsaved changes detected</p>
              </div>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-purple-500/30 transition-all active:scale-95"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, icon, children }) {
  return (
    <section className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FloatingInput({ label, icon, ...props }) {
  return (
    <div className="relative group">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-purple-500 transition-colors">{icon}</div>}
      <input
        {...props}
        placeholder={label}
        className={`w-full ${icon ? "pl-11" : "pl-4"} pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all`}
      />
    </div>
  );
}

function Input(props) {
  return (
    <input 
      {...props} 
      className="w-full px-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all" 
    />
  );
}

function ProfileStrength({ strength }) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-6">
      <h3 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Profile Strength</h3>
      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${strength}%` }}
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
        />
      </div>
      <p className="text-sm mt-3 text-slate-500 dark:text-slate-400 font-medium">
        {strength === 100 ? "🎉 Profile Complete!" : `${strength}% complete - keep going!`}
      </p>
    </div>
  );
}

function ProfilePreview({ formData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
    >
      <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-500" />
      <div className="px-8 pb-10">
        <div className="relative -top-12 flex flex-col md:flex-row md:items-end gap-6">
          <div className="w-32 h-32 rounded-3xl bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden">
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} />
            )}
          </div>
          <div className="pb-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-purple-600 font-medium">
              {formData.headline || "Your Professional Headline"}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">About</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{formData.bio || "No bio added yet."}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map((s) => (
                    <span key={s} className="px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold border border-purple-100 dark:border-purple-800">{s}</span>
                  ))
                ) : (
                  <span className="text-slate-400 dark:text-slate-500 text-sm">No skills added</span>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200"><LinkIcon size={16} /> Connect</h4>
              <div className="space-y-3 text-sm">
                {formData.github && <a href={formData.github} className="flex items-center gap-3 hover:text-purple-500 transition-colors text-slate-600 dark:text-slate-300"><Github size={16} /> GitHub</a>}
                {formData.linkedin && <a href={formData.linkedin} className="flex items-center gap-3 hover:text-purple-500 transition-colors text-slate-600 dark:text-slate-300"><Linkedin size={16} /> LinkedIn</a>}
                {formData.portfolio && <a href={formData.portfolio} className="flex items-center gap-3 hover:text-purple-500 transition-colors text-slate-600 dark:text-slate-300"><Globe size={16} /> Portfolio</a>}
                <div className="flex items-center gap-3 opacity-70 text-slate-600 dark:text-slate-300"><MapPin size={16} /> {formData.location || "Earth"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}