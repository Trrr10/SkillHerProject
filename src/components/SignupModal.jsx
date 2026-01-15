import { X, User, Briefcase, Sparkles, LayoutGrid, LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthModal({ type = "signup", onClose, onSwitch, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", mode: "Both" });
  const navigate = useNavigate();

  const isSignup = type === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        mode: formData.mode,
      },
    },
  });

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  onClose();
  navigate("/dashboard");
  setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      {/* Clickable Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Progress Bar - Matches Login Gradient */}
        <div className="h-1.5 w-full bg-gray-100">
          <div 
            className="h-full transition-all duration-500" 
            style={{ background: "linear-gradient(90deg, #7C3AED, #EC4899)" }}
          />
        </div>

        <button onClick={onClose} className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
          <X size={22} />
        </button>

        <div className="p-8 pt-10">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              {isSignup ? "Join 5,000+ women thriving on SkillHer." : "Please enter your details to sign in"}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                required
                type="password"
                placeholder="Set your Password"
                className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                required
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            {isSignup && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">I want to...</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "Find Jobs", icon: <Briefcase size={18} />, label: "Hire" },
                    { id: "Sell Services", icon: <Sparkles size={18} />, label: "Work" },
                    { id: "Both", icon: <LayoutGrid size={18} />, label: "Both" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({...formData, mode: opt.id})}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        formData.mode === opt.id 
                        ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm" 
                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      {opt.icon}
                      <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button - Matches Login Modal Styling */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-purple-500/40 active:scale-[0.98] disabled:opacity-70 mt-4"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2 text-lg">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isSignup ? "Get Started" : "Log In"}
                    {isSignup ? <ArrowRight size={20} /> : <LogIn size={20} />}
                  </>
                )}
              </span>
            </button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button 
                onClick={onSwitch}
                className="text-purple-600 font-bold hover:text-purple-700 transition-colors"
              >
                {isSignup ? "Log in" : "Sign up for free"}
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}