// Dashboard.jsx
// React + Tailwind CSS (NO TypeScript)
// This is a sample user dashboard page shown after login

import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">Welcome back, Vedika 👋</h1>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition">
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">Courses Enrolled</p>
          <h2 className="text-3xl font-bold text-purple-600">3</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">Jobs Applied</p>
          <h2 className="text-3xl font-bold text-pink-600">5</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">Active Services</p>
          <h2 className="text-3xl font-bold text-green-600">2</h2>
        </div>
      </div>

      {/* Learning Progress */}
      <section className="bg-white rounded-2xl p-6 shadow mb-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📘 Learning Progress</h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Web Development Basics</span>
              <span>70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Graphic Design</span>
              <span>40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-pink-500 h-3 rounded-full" style={{ width: "40%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Section */}
      <section className="bg-white rounded-2xl p-6 shadow mb-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">🛍 Your Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold">Resume Design</h3>
            <p className="text-sm text-gray-500">Orders Completed: 12</p>
            <p className="text-sm text-green-600">Earnings: ₹8,500</p>
          </div>
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold">Instagram Post Design</h3>
            <p className="text-sm text-gray-500">Orders Completed: 6</p>
            <p className="text-sm text-green-600">Earnings: ₹4,200</p>
          </div>
        </div>
      </section>

      {/* Job Applications */}
      <section className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">💼 Job Applications</h2>
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span>Frontend Intern – Remote</span>
            <span className="text-yellow-600">Under Review</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>Content Writer</span>
            <span className="text-green-600">Shortlisted</span>
          </li>
          <li className="flex justify-between">
            <span>UI Designer</span>
            <span className="text-red-500">Rejected</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
