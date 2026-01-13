import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award, Plus, Circle } from "lucide-react";
import { Heart, Shield, Target, TrendingUp } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-purple-100 relative overflow-hidden">
      
      {/* --- LAYER 1: FLOATING GRADIENT BLOBS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 80, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0], 
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[100px]"
        />
      </div>

      {/* --- LAYER 2: FLOATING SKILL PARTICLES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: "-10vh",
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute text-purple-300"
          >
            {i % 2 === 0 ? <Plus size={24} /> : <Circle size={12} />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* 1. HERO SECTION */}
        <section className="relative pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-6">
                ESTABLISHED 2024
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                We built this because <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  your skills are enough.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                SkillHer respects the expertise you already have. No forced courses. No gatekeeping. Just a direct path to earning.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex items-center space-x-4 text-purple-800 font-bold bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white inline-flex">
                <ShieldCheck className="w-6 h-6" />
                <span>Zero Gatekeeping • Immediate Earning</span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                alt="Professional woman"
                className="relative rounded-[2.5rem] shadow-2xl z-10 border border-white/50"
              />
            </motion.div>
          </div>
        </section>

        {/* 2. THE CORE PROBLEM */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-4xl font-bold mb-16"
            >
              Ending the "Perpetual Student" Trap
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2rem] bg-red-50/50 backdrop-blur-md border border-red-100/50">
                <h3 className="font-bold text-red-600 text-xl mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" /> The Problem
                </h3>
                <p className="text-slate-700 leading-relaxed italic">
                  "Why must I complete a 4-week course just to prove I can write code or design a logo I've been doing for years?"
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2rem] bg-green-50/50 backdrop-blur-md border border-green-100/50 shadow-xl shadow-green-900/5">
                <h3 className="font-bold text-green-700 text-xl mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" /> Our Solution
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  We verify your existing portfolio and resume on day one. If you can do the work, you get the work.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. WHAT WE PROVIDE (Glassmorphism Cards) */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Market Access", color: "text-orange-500" },
              { icon: <Award />, title: "Skill Identity", color: "text-purple-600" },
              { icon: <ShieldCheck />, title: "Safety Net", color: "text-blue-500" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg shadow-purple-900/5 group"
              >
                <div className={`mb-6 p-4 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  Engineered to respect your time. No mandatory certifications. Just professional infrastructure for women.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. THE MANIFESTO */}
        <section className="py-24 text-center relative px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-24 text-white relative overflow-hidden"
          >
            {/* Animated inner background for CTA */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]"
            />
            {/* --- LAYER 3: FLOATING MEANINGFUL ICONS --- */}
<div className="fixed inset-0 z-0 pointer-events-none">
  {[
    { Icon: Heart, color: "text-pink-300", left: "10%", top: "20%" },
    { Icon: Shield, color: "text-purple-300", left: "80%", top: "30%" },
    { Icon: Target, color: "text-indigo-300", left: "60%", top: "70%" },
    { Icon: TrendingUp, color: "text-green-300", left: "25%", top: "75%" },
  ].map((item, i) => (
    <motion.div
      key={i}
      className={`absolute ${item.color}`}
      style={{ left: item.left, top: item.top }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.15, 0.35, 0.15],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <item.Icon size={64} strokeWidth={1.2} />
    </motion.div>
  ))}
</div>
{/* --- LAYER 3: FLOATING MEANINGFUL ICONS --- */}
<div className="fixed inset-0 z-[5] pointer-events-none">
  {[
    { Icon: Heart, color: "text-pink-400", left: "10%", top: "20%" },
    { Icon: Shield, color: "text-purple-400", left: "80%", top: "30%" },
    { Icon: Target, color: "text-indigo-400", left: "60%", top: "70%" },
    { Icon: TrendingUp, color: "text-green-400", left: "25%", top: "75%" },
  ].map((item, i) => (
    <motion.div
      key={i}
      className={`absolute ${item.color}`}
      style={{ left: item.left, top: item.top }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 15, -15, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 10 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <item.Icon size={72} strokeWidth={1.4} />
    </motion.div>
  ))}
</div>


            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to be respected?</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
                Join the only platform that doesn't ask you to learn what you already know.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-2xl font-black transition-all"
              >
                Go to My Dashboard
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}