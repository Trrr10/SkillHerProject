import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Send,
  Target, Heart, Star,
  ChevronDown, Sparkles
} from "lucide-react";

const ContactUs = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How fast can I start earning after signing up?",
      a: "Immediately! Once you upload your portfolio or resume, you can apply for verified jobs or list your services."
    },
    {
      q: "Is there a fee to join the SkillHer community?",
      a: "Joining is free. We only take a small service fee after successful paid work."
    },
    {
      q: "How does the Safety Layer protect me?",
      a: "AI harassment detection, escrow payments, and women-only verification."
    }
  ];

  return (
    <main className="
      relative overflow-hidden min-h-screen
      bg-[#D6A4DE] dark:bg-slate-950
      selection:bg-purple-300 dark:selection:bg-purple-800
    ">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px]
            bg-white dark:bg-purple-800/30
            rounded-full blur-[120px]"
        />

        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-1/2 -right-32 w-[400px] h-[400px]
            bg-gradient-to-r from-pink-200 to-purple-200
            dark:from-pink-700/30 dark:to-purple-700/30
            rounded-full blur-[100px]"
        />

        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-[20%] right-[15%] text-white/10 dark:text-purple-900/30"
        >
          <Target size={160} />
        </motion.div>

        <motion.div
          animate={{ x: [-30, 30, -30] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-[10%] left-[10%] text-white/10 dark:text-pink-900/30"
        >
          <Heart size={100} fill="currentColor" />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] left-[5%] text-white/10 dark:text-yellow-900/30"
        >
          <Star size={60} fill="currentColor" />
        </motion.div>
      </div>

      {/* 🌟 CONTENT */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="pt-32 pb-14 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="
              inline-flex items-center gap-2 px-5 py-2 rounded-full
              bg-white/20 dark:bg-slate-900/60
              border border-white/30 dark:border-slate-700
              text-white dark:text-purple-300
              font-bold text-sm mb-6
            ">
              <Sparkles size={16} className="text-orange-300" />
              WE'RE HERE FOR YOU
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-4">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-300">
                Touch
              </span>
            </h1>

            <p className="text-white/80 dark:text-slate-300 text-xl max-w-xl mx-auto">
              Whether you're hiring or looking for work, we’re here to help.
            </p>
          </div>
        </section>

        {/* GRID */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Mail />, title: "Email", value: "hello@skillher.com", color: "purple" },
                  { icon: <Phone />, title: "Support", value: "+1 (555) HER-SKILL", color: "pink" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="
                      bg-white/90 dark:bg-slate-900/70
                      backdrop-blur-xl p-8 rounded-[2.5rem]
                      border border-white dark:border-slate-700
                      shadow-xl
                    "
                  >
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center mb-6
                      bg-${item.color}-100 dark:bg-${item.color}-900/40
                      text-${item.color}-600 dark:text-${item.color}-300
                    `}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="
                bg-slate-900 dark:bg-black
                rounded-[3rem] p-10 text-white
              ">
                <h3 className="text-3xl font-bold mb-2">Office HQ</h3>
                <p className="text-slate-400 flex items-center gap-2 mb-6">
                  <MapPin size={18} /> New York, NY
                </p>
                <div className="rounded-2xl overflow-hidden h-56 border border-white/10">
                  <iframe
                    title="map"
                    className="w-full h-full grayscale opacity-80"
                    src="https://www.google.com/maps?q=New+York&output=embed"
                  />
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="
              bg-white dark:bg-slate-900
              rounded-[3rem] p-10 md:p-14
              shadow-2xl
            ">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-8">
                Send a Message
              </h2>

              <form className="space-y-5">
                {["Name", "Email"].map((field, i) => (
                  <input
                    key={i}
                    placeholder={`Your ${field}`}
                    className="
                      w-full px-6 py-4 rounded-2xl
                      bg-slate-50 dark:bg-slate-800
                      text-slate-900 dark:text-white
                      placeholder-slate-500
                      border-2 border-transparent
                      focus:border-purple-500 outline-none
                    "
                  />
                ))}

                <textarea
                  rows="5"
                  placeholder="Tell us how we can help..."
                  className="
                    w-full px-6 py-4 rounded-2xl
                    bg-slate-50 dark:bg-slate-800
                    text-slate-900 dark:text-white
                    placeholder-slate-500
                    border-2 border-transparent
                    focus:border-purple-500 outline-none
                  "
                />

                <button
                  className="
                    w-full py-5 rounded-2xl
                    bg-gradient-to-r from-orange-400 to-pink-600
                    text-white font-black text-xl
                    shadow-xl flex items-center justify-center gap-3
                  "
                >
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-10">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="
                  bg-white/90 dark:bg-slate-900/80
                  backdrop-blur rounded-3xl overflow-hidden
                "
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center"
                >
                  <span className="font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`transition ${
                      activeFaq === i ? "rotate-180" : ""
                    } text-purple-500`}
                  />
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 dark:text-slate-400"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactUs;
