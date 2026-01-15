import { motion } from "framer-motion";
import {
  ShieldCheck, Zap, Award, Plus, Circle,
  Code, Palette, Briefcase, Users, Star
} from "lucide-react";
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
    <div className="min-h-screen 
      bg-[#FDFCFB] dark:bg-slate-950 
      text-slate-900 dark:text-slate-100 
      selection:bg-purple-200 dark:selection:bg-purple-800 
      relative overflow-hidden"
    >

      {/* 🌈 GRADIENT BLOBS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 80, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px]
            bg-purple-300/40 dark:bg-purple-800/30
            rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px]
            bg-pink-200/40 dark:bg-pink-700/30
            rounded-full blur-[100px]"
        />
      </div>

      {/* ✨ PARTICLES */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
            animate={{ opacity: [0, 0.3, 0], y: "-10vh", rotate: 360 }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity }}
            className="absolute text-purple-400 dark:text-purple-600"
          >
            {i % 2 === 0 ? <Plus size={24} /> : <Circle size={12} />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">

        {/* 🔥 HERO */}
        <section className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div
                variants={fadeInUp}
                className="inline-block px-4 py-1 rounded-full
                  bg-purple-100 dark:bg-purple-900/40
                  text-purple-700 dark:text-purple-300
                  text-sm font-bold mb-6"
              >
                ESTABLISHED 2024
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-black leading-tight mb-8"
              >
                We built this because <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r
                  from-purple-500 to-pink-500">
                  your skills are enough.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg"
              >
                SkillHer respects the expertise you already have.
                No forced courses. No gatekeeping.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3
                  bg-white/60 dark:bg-slate-900/60
                  backdrop-blur border border-white/40 dark:border-slate-700
                  text-purple-800 dark:text-purple-300
                  font-bold p-4 rounded-2xl inline-flex"
              >
                <ShieldCheck className="w-6 h-6" />
                Zero Gatekeeping • Immediate Earning
              </motion.div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4
                bg-gradient-to-r from-purple-500 to-pink-500
                opacity-20 rounded-[3rem] blur-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                alt="Professional woman"
                className="relative rounded-[2.5rem]
                  border border-white/40 dark:border-slate-700
                  shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* 💎 GLASS CARDS */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Market Access" },
              { icon: <Award />, title: "Skill Identity" },
              { icon: <ShieldCheck />, title: "Safety Net" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem]
                  bg-white/50 dark:bg-slate-900/50
                  backdrop-blur border border-white/60 dark:border-slate-700
                  shadow-lg"
              >
                <div className="mb-6 p-4 w-16 h-16 rounded-2xl
                  bg-white dark:bg-slate-800 text-purple-600">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  No certifications. Just real work for real skills.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🚀 CTA */}
        <section className="py-24 text-center px-6">
          <div className="max-w-4xl mx-auto
            bg-slate-900 dark:bg-black
            rounded-[3.5rem] p-16 text-white"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Ready to be respected?
            </h2>
            <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">
              Join the only platform that doesn’t ask you to relearn.
            </p>
            <button className="px-12 py-6 bg-gradient-to-r
              from-purple-500 to-pink-500
              rounded-2xl text-2xl font-black">
              Go to My Dashboard
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
