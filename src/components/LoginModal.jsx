import { X, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginModal({ onClose, onSignup }) {
   const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
  

    onClose();                
    navigate("/dashboard");    
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl w-full max-w-md relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-center">
          Welcome Back ✨
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-3 rounded-xl mb-3 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-3 rounded-xl mb-5 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Beautiful Login Button */}
        <button
          onClick={handleLogin}
          className="group relative w-full py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <span className="relative flex items-center justify-center gap-2">
            <LogIn size={18} />
            Log In
          </span>
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <button
            onClick={onSignup}
            className="text-purple-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
