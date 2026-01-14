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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 tracking-tight drop-shadow-sm">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-slate-600 font-medium mt-2">Here's what's happening with your career today.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Courses Enrolled" value="3" icon={<BookOpen className="text-purple-600" />} color="bg-gradient-to-br from-purple-50 to-purple-100" emoji="📚" />
          <StatCard title="Jobs Applied" value="5" icon={<Briefcase className="text-pink-600" />} color="bg-gradient-to-br from-pink-50 to-pink-100" emoji="💼" />
          <StatCard title="Earnings" value="₹12,700" icon={<TrendingUp className="text-emerald-600" />} color="bg-gradient-to-br from-emerald-50 to-emerald-100" emoji="💰" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Learning & Services */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Learning Progress Card */}
            <section className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_10px_40px_rgba(168,85,247,0.12)] border border-purple-100 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-500" /> Continuous Learning
                </h2>
                <button className="text-purple-600 text-sm font-bold hover:underline hover:text-purple-700">View All →</button>
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

function JobItem({ company, type, status, statusColor }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-purple-200 hover:shadow-md group cursor-pointer">
      <div className="flex flex-col">
        <span className="font-bold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">{company}</span>
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1">{type}</span>
      </div>
      <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight ${statusColor} shadow-sm`}>
        {status}
      </span>
    </div>
  );
}