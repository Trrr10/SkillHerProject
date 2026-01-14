import { X, LogIn, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginModal({ onClose, onSignup, onSuccess }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page refresh
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields to continue.");
      return;
    }

    // Logic
    const userData = { name: formData.name, email: formData.email };
    localStorage.setItem("user", JSON.stringify(userData));

    onSuccess(userData);
    onClose();
    navigate("/dashboard");
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-3xl w-full max-w-md relative shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-xs text-purple-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="group relative w-full py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-purple-500/40 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative flex items-center justify-center gap-2 text-lg">
              <LogIn size={20} />
              Log In
            </span>
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-8">
          Don’t have an account?{" "}
          <button
            onClick={onSignup}
            className="text-purple-600 font-bold hover:text-purple-700 transition-colors"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
}