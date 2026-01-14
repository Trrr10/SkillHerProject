import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Target, Heart, Star, ChevronDown, Sparkles } from "lucide-react";

const ContactUs = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How fast can I start earning after signing up?",
      a: "Immediately! Once you upload your portfolio or resume, you can apply for verified jobs or list your services. We don't believe in mandatory 4-week 'waiting' periods."
    },
    {
      q: "Is there a fee to join the SkillHer community?",
      a: "Joining the community and browsing jobs is completely free. We only take a small service fee once you successfully complete a paid project to keep the platform safe and secure."
    },
    {
      q: "How does the 'Safety Layer' protect me?",
      a: "We use AI-driven harassment detection, escrow payments to ensure you always get paid, and a women-only verification system for both buyers and sellers."
    }
  ];

  return (
    <main className="h-auto bg-[#D6A4DE] relative overflow-hidden selection:bg-purple-200">
      
      {/* --- ENHANCED DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Pulsing Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-white rounded-full blur-[120px]"
        />

        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-[100px]"
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-[80px]"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] left-[20%] w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 100, -30, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[25%] w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm"
        />

        <motion.div
          animate={{
            x: [0, 60, -80, 0],
            y: [0, -40, 80, 0],
            rotate: [0, 90, 270, 360]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[10%] w-8 h-8 bg-white/8 rotate-45 backdrop-blur-sm"
        />

        {/* Particle System */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Floating Constellation Nodes (Animated Network) */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.circle
            animate={{ cx: [100, 150, 100], cy: [200, 250, 200] }}
            transition={{ duration: 20, repeat: Infinity }}
            r="2" fill="white"
          />
          <motion.circle
            animate={{ cx: [800, 750, 800], cy: [400, 450, 400] }}
            transition={{ duration: 15, repeat: Infinity }}
            r="2" fill="white"
          />
          <motion.circle
            animate={{ cx: [300, 350, 300], cy: [600, 650, 600] }}
            transition={{ duration: 18, repeat: Infinity, delay: 3 }}
            r="1.5" fill="white"
          />
          <motion.line
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            x1="100" y1="200" x2="800" y2="400" stroke="white" strokeWidth="0.5" strokeDasharray="5,5"
          />
          <motion.line
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            x1="300" y1="600" x2="150" y2="250" stroke="white" strokeWidth="0.3" strokeDasharray="3,3"
          />
        </svg>

        {/* Floating Icons with Parallax Effect */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] text-white/10"
        >
          <Target size={180} />
        </motion.div>

        <motion.div
          animate={{ x: [-30, 30, -30], y: [0, 50, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] left-[10%] text-white/10"
        >
          <Heart size={100} fill="currentColor" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] left-[5%] text-white/8"
        >
          <Star size={60} fill="currentColor" />
        </motion.div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
        
        {/* HERO */}
        <section className="pt-32 pb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-6">
              <Sparkles size={16} className="text-orange-300" /> WE'RE HERE FOR YOU
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-pink-100">Touch</span>
            </h1>
            <p className="text-white/80 text-xl font-medium max-w-xl mx-auto">
              Whether you're looking for a job or hiring talent, our team is ready to support your journey.
            </p>
          </motion.div>
        </section>

        {/* MAIN GRID */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LEFT SIDE: CARDS & INFO */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600 font-medium">hello@skillher.com</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Support</h3>
                  <p className="text-slate-600 font-medium">+1 (555) HER-SKILL</p>
                </motion.div>
              </div>

              <motion.div className="bg-slate-900 rounded-[3rem] p-10 flex-grow text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Office Headquarters</h3>
                  <p className="text-slate-400 mb-8 flex items-center gap-2"><MapPin size={18} /> New York, NY 10001</p>
                </div>
                <div className="rounded-2xl overflow-hidden h-56 border-4 border-white/5 shadow-inner">
                  <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1652312345678" className="w-full h-full grayscale opacity-80" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: FORM */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-purple-900/30"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl font-black text-slate-900 mb-8"
              >
                Send a Message
              </motion.h2>
              <form className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white focus:shadow-lg focus:shadow-purple-100 outline-none transition-all duration-300 hover:bg-slate-100"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white focus:shadow-lg focus:shadow-purple-100 outline-none transition-all duration-300 hover:bg-slate-100"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white focus:shadow-lg focus:shadow-purple-100 outline-none resize-none transition-all duration-300 hover:bg-slate-100"
                  />
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-600 text-white font-black text-xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Send size={20} />
                  </motion.div>
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* --- DYNAMIC FAQ ACCORDION --- */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2">Common Questions</h2>
            <div className="w-20 h-1.5 bg-white/30 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                    <ChevronDown size={24} className="text-purple-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default ContactUs;