import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Upload, MapPin, User, Link as LinkIcon,
  Briefcase, GraduationCap, CheckCircle2, Github,
  Linkedin, Globe, FileText, AlignLeft, Sparkles,
  Eye, Edit3, Search, Save, AlertCircle, Loader2,
  Trash2, ExternalLink, Calendar, Mail
} from "lucide-react";
// Ensure this points to your specific supabase client location
import { supabase } from "../supabaseClient"; 

/**
 * CREATE PROFILE COMPONENT
 * Handles: Auth-State, Storage Buckets, JSONB courses, and text[] skills.
 * Column Mapping: photo_url, resume_url, skills, courses, etc.
 */
export default function CreateProfile() {
  /* ---------------- 1. STATE MANAGEMENT ---------------- */
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    resume: null,       // Local File
    photo: null,        // Local File
    photo_url: "",      // DB String
    resume_url: "",     // DB String
  });

  /* ---------------- 2. DATA SYNCHRONIZATION ---------------- */

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || user.email,
          headline: data.headline || "",
          location: data.location || "",
          bio: data.bio || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
          courses: Array.isArray(data.courses) ? data.courses : [],
          photo_url: data.photo_url || "",
          resume_url: data.resume_url || "",
        }));
      }
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
      // Timeout ensures initial state setting doesn't trigger the "Unsaved Changes" bar
      setTimeout(() => setHasChanges(false), 500);
    }
  };

  /* ---------------- 3. FILE STORAGE LOGIC ---------------- */

const uploadToSupabase = async (file, bucket) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required for upload");

  const fileExt = file.name.split(".").pop();
  // Sanitizing the path: userId/filename
  const filePath = `${user.id}/${Date.now()}.${fileExt}`;

  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { 
      cacheControl: '3600',
      upsert: true,
      contentType: file.type // Ensures the PDF renders in browser
    });

  if (uploadError) {
    console.error(`Storage Error (${bucket}):`, uploadError.message);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};
  /* ---------------- 4. CORE ACTION HANDLERS ---------------- */

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };
const handleSave = async () => {
    try {
      setSaving(true);
      
      // 1. Get current session explicitly
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("Your session has expired. Please log in again.");
      }

      console.log("Saving profile for UID:", user.id);

      let finalPhotoUrl = formData.photo_url;
      let finalResumeUrl = formData.resume_url;

      // 2. Handle File Uploads
      if (formData.photo instanceof File) {
        finalPhotoUrl = await uploadToSupabase(formData.photo, "avatars");
      }
      if (formData.resume instanceof File) {
        finalResumeUrl = await uploadToSupabase(formData.resume, "documents");
      }

      // 3. Prepare Payload (Ensuring no undefined values)
      const profilePayload = {
        id: user.id,
        name: formData.name || null,
        email: formData.email || user.email || null,
        headline: formData.headline || null,
        location: formData.location || null,
        bio: formData.bio || null,
        github: formData.github || null,
        linkedin: formData.linkedin || null,
        portfolio: formData.portfolio || null,
        photo_url: finalPhotoUrl || null,
        resume_url: finalResumeUrl || null,
        skills: formData.skills || [],
        courses: formData.courses || [],
        updated_at: new Date().toISOString(),
      };

      // 4. Perform Upsert
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert(profilePayload, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select();

      if (upsertError) {
        console.error("Supabase Upsert Error Detail:", upsertError);
        throw upsertError;
      }

      // 5. SUCCESS LOGIC: Update state and switch to preview
      setFormData(prev => ({
        ...prev,
        photo_url: finalPhotoUrl,
        resume_url: finalResumeUrl,
        photo: null,  // Clear local file states
        resume: null
      }));
      
      setHasChanges(false);
      setIsPreview(true); // <--- THIS SWITCHES THE VIEW AUTOMATICALLY
      
      alert("🚀 Profile Published Successfully!");
      
    } catch (err) {
      console.error("Full Error Object:", err);
      alert(`Sync Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };
  /* ---------------- 5. SUB-ITEM HANDLERS ---------------- */

  const addSkill = () => {
    const cleanSkill = formData.skillInput.trim();
    if (cleanSkill && !formData.skills.includes(cleanSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, cleanSkill],
        skillInput: ""
      }));
      setHasChanges(true);
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
    setHasChanges(true);
  };

  const addCourse = () => {
    if (formData.courseTitle.trim() && formData.courseProgress !== "") {
      const newCourse = {
        id: Date.now(),
        title: formData.courseTitle.trim(),
        progress: parseInt(formData.courseProgress),
        date: new Date().toLocaleDateString()
      };
      setFormData(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse],
        courseTitle: "",
        courseProgress: ""
      }));
      setHasChanges(true);
    }
  };

  const removeCourse = (id) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id)
    }));
    setHasChanges(true);
  };

  /* ---------------- 6. CALCULATED VARIABLES ---------------- */

  const calculateStrength = () => {
    let score = 0;
    if (formData.name) score += 15;
    if (formData.headline) score += 10;
    if (formData.location) score += 5;
    if (formData.bio.length > 30) score += 15;
    if (formData.skills.length >= 3) score += 20;
    if (formData.github || formData.linkedin) score += 20;
    if (formData.photo || formData.photo_url) score += 15;
    return Math.min(score, 100);
  };

  // DEFINING STRENGTH HERE TO FIX THE REFERENCE ERROR
  const strength = calculateStrength(); 

  /* ---------------- 7. MAIN UI ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0E14]">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 pb-32 transition-colors duration-300">
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent"
            >
              {isPreview ? "Portfolio Hub" : "Engineer Workspace"}
            </motion.h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">
              {isPreview ? "How the tech world sees you." : "Craft your developer identity."}
            </p>
          </div>

          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl font-bold hover:text-purple-600 transition-all active:scale-95"
          >
            {isPreview ? <><Edit3 size={18}/> Studio Mode</> : <><Eye size={18}/> Launch Preview</>}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: EDITING INTERFACE */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!isPreview ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  
                  {/* BASIC BIO */}
                  <Section title="Professional Identity" icon={<User size={22}/>}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <FloatingInput
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        icon={<User size={18} />}
                      />
                      <FloatingInput
                        label="Current Location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        icon={<MapPin size={18} />}
                      />
                    </div>
                    <FloatingInput
                      label="Job Title / Headline"
                      value={formData.headline}
                      onChange={(e) => handleInputChange("headline", e.target.value)}
                      icon={<Briefcase size={18} />}
                    />
                    <textarea
                      placeholder="Biography: Share your tech stack, passions, and achievements..."
                      rows={6}
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="w-full mt-6 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                    />

                    {/* PHOTO & RESUME AREA */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                          {(formData.photo || formData.photo_url) ? (
                            <img 
                              src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo_url} 
                              className="w-full h-full object-cover" 
                              alt="User Avatar"
                            />
                          ) : (
                            <Upload className="text-slate-300" />
                          )}
                        </div>
                        <label className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-purple-700 transition-colors">
                          {formData.photo || formData.photo_url ? "Change Photo" : "Upload Photo"}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleInputChange("photo", e.target.files[0])} />
                        </label>
                      </div>

                      <div className="p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex flex-col items-center">
                        <FileText size={40} className={formData.resume || formData.resume_url ? "text-green-500" : "text-slate-300"} />
                        <p className="mt-3 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">
                          {formData.resume ? formData.resume.name : (formData.resume_url ? "Resume Attached" : "Curriculum Vitae (PDF)")}
                        </p>
                        <label className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold cursor-pointer transition-all">
                          Upload CV
                          <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleInputChange("resume", e.target.files[0])} />
                        </label>
                      </div>
                    </div>
                  </Section>

                  {/* CONNECTIVITY */}
                  <Section title="Social Graph" icon={<LinkIcon size={22}/>}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FloatingInput label="GitHub" icon={<Github size={18} />} value={formData.github} onChange={(e) => handleInputChange("github", e.target.value)} />
                      <FloatingInput label="LinkedIn" icon={<Linkedin size={18} />} value={formData.linkedin} onChange={(e) => handleInputChange("linkedin", e.target.value)} />
                      <FloatingInput label="Portfolio" icon={<Globe size={18} />} value={formData.portfolio} onChange={(e) => handleInputChange("portfolio", e.target.value)} />
                    </div>
                  </Section>

                  {/* SKILLS */}
                  <Section title="Technical Arsenal" icon={<Briefcase size={22}/>}>
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <Input
                          placeholder="Skill name (e.g. Docker, Rust, UX Design)"
                          value={formData.skillInput}
                          onChange={(e) => handleInputChange("skillInput", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        />
                      </div>
                      <button onClick={addSkill} className="p-4.5 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition-all">
                        <Plus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {formData.skills.map((skill, i) => (
                        <motion.div
                          layout
                          key={`${skill}-${i}`}
                          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 font-bold text-sm shadow-sm"
                        >
                          {skill}
                          <X size={14} className="text-red-500 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </motion.div>
                      ))}
                    </div>
                  </Section>

                  {/* COURSES (JSONB EXAMPLE) */}
                  <Section title="Certifications" icon={<GraduationCap size={22}/>}>
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 mb-8">
                       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="md:col-span-3">
                            <Input placeholder="Certification Title" value={formData.courseTitle} onChange={(e) => handleInputChange("courseTitle", e.target.value)} />
                          </div>
                          <div className="md:col-span-1">
                            <Input type="number" placeholder="%" value={formData.courseProgress} onChange={(e) => handleInputChange("courseProgress", e.target.value)} />
                          </div>
                          <button onClick={addCourse} className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black">Save</button>
                       </div>
                    </div>

                    <div className="space-y-4">
                      {formData.courses.map((course) => (
                        <div key={course.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
                              <CheckCircle2 size={20} />
                            </div>
                            <div>
                              <p className="font-black">{course.title}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{course.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="font-black text-sm">{course.progress}%</span>
                             <button onClick={() => removeCourse(course.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                               <Trash2 size={18} />
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>

                </motion.div>
              ) : (
                <ProfilePreview formData={formData} />
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR: ANALYTICS */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl sticky top-8">
              <h3 className="text-xl font-black mb-6">Profile Health</h3>
              
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${strength}%` }}
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-green-400"
                />
              </div>
              <p className="text-sm font-bold text-slate-500 mb-8">{strength}% Optimized</p>

              <div className="space-y-4">
                 <CheckRow label="High-Res Avatar" active={formData.photo || formData.photo_url} />
                 <CheckRow label="Skill Matrix" active={formData.skills.length >= 3} />
                 <CheckRow label="Social Auth" active={formData.github || formData.linkedin} />
                 <CheckRow label="Tech CV Indexed" active={formData.resume || formData.resume_url} />
              </div>

              <div className="mt-10 p-6 rounded-[2rem] bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
                <div className="flex gap-3">
                  <Sparkles size={20} className="shrink-0" />
                  <p className="text-sm font-medium leading-relaxed">
                    Complete profiles are 4x more likely to be prioritized by recruiters.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <AnimatePresence>
        {hasChanges && !isPreview && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 flex justify-center pointer-events-none"
          >
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-full px-10 py-5 flex items-center gap-8 pointer-events-auto">
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 dark:text-white">Unsaved Data</span>
                <span className="text-xs text-slate-500 font-bold">Sync with Supabase</span>
              </div>
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="flex items-center gap-3 bg-purple-600 text-white px-10 py-3.5 rounded-full font-black shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {saving ? "Syncing..." : "Publish Profile"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- 8. SUB-COMPONENTS ---------------- */

function Section({ title, icon, children }) {
  return (
    <section className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl">{icon}</div>
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FloatingInput({ label, icon, ...props }) {
  return (
    <div className="relative group w-full">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
        {icon}
      </div>
      <input
        {...props}
        placeholder={label}
        className="w-full pl-14 pr-6 py-4.5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all font-bold text-sm"
      />
    </div>
  );
}

function Input(props) {
  return (
    <input 
      {...props} 
      className="w-full px-6 py-4.5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all font-bold text-sm" 
    />
  );
}

function CheckRow({ label, active }) {
  return (
    <div className="flex items-center gap-3">
       <div className={`w-5 h-5 rounded-full flex items-center justify-center ${active ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
         {active && <CheckCircle2 size={12} />}
       </div>
       <span className={`text-sm font-bold ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{label}</span>
    </div>
  );
}

function ProfilePreview({ formData }) {
  const photoURL = formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo_url;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-500" />
      <div className="px-12 pb-20">
        <div className="relative -top-16 flex flex-col md:flex-row items-end gap-8">
          <div className="w-40 h-40 rounded-[3rem] bg-slate-200 dark:bg-slate-800 border-[8px] border-white dark:border-slate-900 shadow-xl overflow-hidden flex items-center justify-center">
            {photoURL ? <img src={photoURL} className="w-full h-full object-cover" /> : <User size={48} className="text-slate-400" />}
          </div>
          <div className="pb-4">
            <h2 className="text-4xl font-black">{formData.name || "Talent Name"}</h2>
            <p className="text-purple-600 font-black text-lg">{formData.headline || "Seeking Opportunities"}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mt-4">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Biography</h4>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{formData.bio || "No biography provided yet."}</p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(s => (
                  <span key={s} className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h4 className="font-black mb-6">Connect</h4>
              <div className="space-y-4">
                {formData.github && <a href={formData.github} className="flex items-center gap-3 text-sm font-bold hover:text-purple-600 transition-colors"><Github size={18} /> GitHub</a>}
                {formData.linkedin && <a href={formData.linkedin} className="flex items-center gap-3 text-sm font-bold hover:text-purple-600 transition-colors"><Linkedin size={18} /> LinkedIn</a>}
                {formData.portfolio && <a href={formData.portfolio} className="flex items-center gap-3 text-sm font-bold hover:text-purple-600 transition-colors"><Globe size={18} /> Portfolio</a>}
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400"><MapPin size={18} /> {formData.location || "Earth"}</div>
              </div>
              
              {/* CV DOWNLOAD */}
              {(formData.resume || formData.resume_url) && (
                <a 
                  href={formData.resume instanceof File ? URL.createObjectURL(formData.resume) : formData.resume_url} 
                  target="_blank"
                  className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-sm transition-transform hover:scale-105"
                >
                  <FileText size={16} /> View CV
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}