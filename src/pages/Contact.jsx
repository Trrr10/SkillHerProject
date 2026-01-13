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
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
        </svg>

        {/* Floating Icons with Parallax Effect */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[15%] text-white/10"
        >
          <Target size={180} />
        </motion.div>
        
        <motion.div 
          animate={{ x: [-30, 30, -30], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] left-[10%] text-white/10"
        >
          <Heart size={100} fill="currentColor" />
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
            <motion.div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-purple-900/30">
              <h2 className="text-4xl font-black text-slate-900 mb-8">Send a Message</h2>
              <form className="space-y-5">
                <input type="text" placeholder="Your Name" className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white outline-none transition-all" />
                <input type="email" placeholder="Your Email" className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white outline-none transition-all" />
                <textarea rows="5" placeholder="Tell us how we can help..." className="w-full rounded-2xl px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-purple-400 focus:bg-white outline-none resize-none transition-all" />
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-600 text-white font-black text-xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3"
                >
                  <Send size={20} /> Send Message
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