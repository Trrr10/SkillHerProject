import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import ThreeWays from "../components/ThreeWays";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        
        {/* Badge */}
        <div className="flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm mb-6">
          <ShieldCheck size={16} />
          Safe, Verified & Women-Only
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Skills Are Enough.
          <br />
          <span className="text-purple-600">Start Earning Today.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-gray-600 mt-6 text-lg">
          No courses. No certifications. No gatekeeping.
          A trusted platform where women sell services, find jobs,
          and grow—on their own terms.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-10">
          <button className="bg-purple-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition">
            Get Started Free <ArrowRight size={18} />
          </button>

          <button className="bg-purple-100 text-purple-600 px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-purple-200 transition">
            <Sparkles size={18} /> See How It Works
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex gap-8 mt-14 text-gray-600 text-sm">
          <span>🟢 Verified Employers</span>
          <span>🟢 Escrow Payments</span>
          <span>🟢 24/7 Safety Support</span>
        </div>
      </section>

      {/* Scroll Section */}
      <ThreeWays />
    </>
  );
}
