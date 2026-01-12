import React from "react";
import { FileText, ShoppingBag, Briefcase } from "lucide-react";

const ThreeWays = () => {
  return (
    <section className="w-full py-20 bg-[#faf7fb]">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-3">
          Three Ways to Start Earning
        </h2>
        <p className="text-gray-600 mb-14">
          No learning required. No waiting. Choose your path and begin immediately.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="rounded-2xl p-8 text-left bg-gradient-to-br from-[#f7e9fb] to-white shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#efd7f6] mb-6">
              <FileText className="text-[#a855f7]" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Show Your Skills
            </h3>

            <p className="text-gray-600 mb-6">
              Upload your resume, add skill tags, build your portfolio.
              No tests, no certifications—just you.
            </p>

            <button className="w-full py-3 rounded-full bg-[#efd7f6] text-gray-900 font-medium hover:bg-[#e7c9f2] transition">
              Create Profile →
            </button>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl p-8 text-left bg-gradient-to-br from-[#f4ecff] to-white shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#e6dbff] mb-6">
              <ShoppingBag className="text-[#8b5cf6]" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Start Selling
            </h3>

            <p className="text-gray-600 mb-6">
              List your services or digital products.
              Set your own price. Suggestions help—never block.
            </p>

            <button className="w-full py-3 rounded-full bg-[#e6dbff] text-gray-900 font-medium hover:bg-[#d7c7ff] transition">
              List a Service →
            </button>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl p-8 text-left bg-gradient-to-br from-[#ecfdf5] to-white shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#d1fae5] mb-6">
              <Briefcase className="text-[#10b981]" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Find Jobs
            </h3>

            <p className="text-gray-600 mb-6">
              Browse verified opportunities.
              Remote, part-time, flexible. Apply with your profile.
            </p>

            <button className="w-full py-3 rounded-full bg-[#d1fae5] text-gray-900 font-medium hover:bg-[#bbf7d0] transition">
              Browse Jobs →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThreeWays;
