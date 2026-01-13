import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupModal({ onClose, onSwitch, onSignupSuccess }) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Both");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const userData = {
      name,
      mode,
    };

    // save user
    localStorage.setItem("user", JSON.stringify(userData));

    // update app state
    onSignupSuccess(userData);

    // close modal + go to dashboard
    onClose();
    navigate("/dashboard");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-1">Join SkillHer</h2>
        <p className="text-gray-500 mb-6">
          Start earning or find jobs today.
        </p>

        {/* Name */}
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Mode Selection */}
        <p className="text-sm font-medium mb-2">
          How do you want to use SkillHer?
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {["Find Jobs", "Sell Services", "Both"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`py-2 rounded-xl border text-sm font-medium transition
                ${
                  mode === item
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-600 hover:border-purple-300"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Create Account */}
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium"
        >
          Create Account
        </button>

        {/* Switch to Login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
