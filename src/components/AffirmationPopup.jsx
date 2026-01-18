import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { affirmations } from "../data/affirmations";

export default function AffirmationPopup() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  // 🌍 Available languages
  const languages = Object.keys(affirmations); // ["en", "hi", "mr"]

  useEffect(() => {
    const showAffirmation = () => {
      // 1️⃣ Pick random language
      const randomLang =
        languages[Math.floor(Math.random() * languages.length)];

      // 2️⃣ Pick random affirmation from that language
      const list = affirmations[randomLang];
      const randomText = list[Math.floor(Math.random() * list.length)];

      setText(randomText);
      setVisible(true);

      setTimeout(() => setVisible(false), 7000);
    };

    showAffirmation(); // first popup
    const interval = setInterval(showAffirmation, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
   
        <AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-20 inset-x-0 z-50 flex justify-center"
    >
      <div
        className="
          w-[90vw] max-w-xl
          bg-gradient-to-r from-purple-600 to-pink-500
          text-white px-8 py-5
          rounded-3xl shadow-2xl
          text-center
        "
      >
        <p className="text-lg md:text-xl font-semibold leading-snug">
          {text}
        </p>
        <p className="text-sm mt-2 opacity-90">
          SkillHer • Empowering Women
        </p>
      </div>
    </motion.div>
  )}

    </AnimatePresence>
  );
}
