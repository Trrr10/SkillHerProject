import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Star,
  ArrowUpRight,
  Award,
  Sparkles,
} from "lucide-react";

const DynamicDash = () => {
  const [stats, setStats] = useState({
    newUsers: 0,
    jobsPosted: 0,
    platformRating: 0,
    activeServices: 0,
  });

  useEffect(() => {
    const finalStats = {
      newUsers: 1247,
      jobsPosted: 583,
      platformRating: 4.8,
      activeServices: 2156,
    };

    const steps = 60;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        newUsers: Math.floor(finalStats.newUsers * progress),
        jobsPosted: Math.floor(finalStats.jobsPosted * progress),
        platformRating: parseFloat(
          (finalStats.platformRating * progress).toFixed(1)
        ),
        activeServices: Math.floor(finalStats.activeServices * progress),
      });

      if (currentStep >= steps) {
        setStats(finalStats);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const statCards = [
    { title: "Active Women", value: stats.newUsers, icon: Users, color: "purple" },
    { title: "Jobs Posted", value: stats.jobsPosted, icon: Briefcase, color: "pink" },
    { title: "Platform Rating", value: stats.platformRating, icon: Star, color: "yellow" },
    { title: "Active Services", value: stats.activeServices, icon: TrendingUp, color: "emerald" },
  ];

  return (
    <section className="relative w-full py-16 overflow-hidden
      bg-gradient-to-b from-white via-purple-50/30 to-white
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Floating Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2
            bg-purple-100 dark:bg-purple-900/40
            px-4 py-2 rounded-full text-sm mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold text-purple-700 dark:text-purple-300">
              Real-Time Insights
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Growing Community
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how women are thriving on our platform every single day
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl p-6
                  bg-white/80 dark:bg-gray-900/70 backdrop-blur
                  shadow-lg dark:shadow-black/40
                  border border-gray-200 dark:border-gray-700
                  hover:-translate-y-1 transition-all">

                <div className="absolute inset-0 rounded-2xl
                  bg-gradient-to-r from-transparent via-purple-200/30 dark:via-purple-500/10 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl mb-4
                    flex items-center justify-center shadow-md
                    bg-gray-100 dark:bg-gray-800">
                    <Icon className="text-purple-600 dark:text-purple-400" />
                  </div>

                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>

                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs mt-1">
                    <ArrowUpRight size={12} />
                    Growing fast
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earnings + Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Earnings */}
          <div className="lg:col-span-2 rounded-3xl p-8 text-white
            bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600
            shadow-2xl relative overflow-hidden">

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10">
              <p className="text-purple-100 mb-2">Total Earnings by Women</p>
              <h2 className="text-5xl font-bold mb-2">$1.2M</h2>

              <div className="flex items-center gap-2 text-purple-100 mb-6">
                <ArrowUpRight />
                +34% from last period
              </div>

              <div className="grid grid-cols-3 gap-4">
                {["$4,850 Avg", "$28.5K Top", "$295K Month"].map((t, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-2xl p-6
              shadow-lg border border-purple-200 dark:border-purple-700/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center">
                  <Award className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Top Category</p>
                  <p className="font-bold text-gray-900 dark:text-white">Design Services</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-2xl p-6
              shadow-lg border border-pink-200 dark:border-pink-700/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/40 rounded-xl flex items-center justify-center">
                  <Star className="text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                  <p className="font-bold text-gray-900 dark:text-white">94.7%</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DynamicDash;
