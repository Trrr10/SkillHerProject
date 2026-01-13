import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Briefcase, 
  Star,
  ArrowUpRight,
  Award,
  Sparkles
} from "lucide-react";

const DynamicDash = () => {
  const [stats, setStats] = useState({
    newUsers: 0,
    jobsPosted: 0,
    platformRating: 0,
    activeServices: 0,
  });

  // Animate numbers on load
  useEffect(() => {
    const finalStats = {
      newUsers: 1247,
      jobsPosted: 583,
      platformRating: 4.8,
      activeServices: 2156,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        newUsers: Math.floor(finalStats.newUsers * progress),
        jobsPosted: Math.floor(finalStats.jobsPosted * progress),
        platformRating: parseFloat((finalStats.platformRating * progress).toFixed(1)),
        activeServices: Math.floor(finalStats.activeServices * progress),
      });

      if (currentStep >= steps) {
        setStats(finalStats);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      title: "Active Women",
      value: stats.newUsers.toLocaleString(),
      change: "+156 this week",
      icon: Users,
      color: "purple",
    },
    {
      title: "Jobs Posted",
      value: stats.jobsPosted.toLocaleString(),
      change: "+42 today",
      icon: Briefcase,
      color: "pink",
    },
    {
      title: "Platform Rating",
      value: stats.platformRating,
      change: "2.3K reviews",
      icon: Star,
      color: "yellow",
    },
    {
      title: "Active Services",
      value: stats.activeServices.toLocaleString(),
      change: "+89 this week",
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-8 overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white">
      
      {/* Subtle floating orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-sm mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-purple-700">Real-Time Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Our Growing Community
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            See how women are thriving on our platform every single day
          </p>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-purple-200 relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${
                    card.color === 'purple' ? 'bg-purple-100' :
                    card.color === 'pink' ? 'bg-pink-100' :
                    card.color === 'yellow' ? 'bg-yellow-100' :
                    'bg-emerald-100'
                  } flex items-center justify-center mb-3 md:mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`${
                      card.color === 'purple' ? 'text-purple-600' :
                      card.color === 'pink' ? 'text-pink-600' :
                      card.color === 'yellow' ? 'text-yellow-600' :
                      'text-emerald-600'
                    }`} size={24} />
                  </div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">{card.title}</p>
                  <p className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ArrowUpRight size={12} />
                    <span>{card.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content - Simplified Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Total Earnings - Featured Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-2">Total Earnings by Women</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">$1.2M</h2>
                  <div className="flex items-center gap-2 text-purple-100">
                    <ArrowUpRight size={16} />
                    <span className="text-sm font-medium">+34% from last period</span>
                  </div>
                </div>
                <div className="hidden md:flex w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center">
                  <DollarSign size={40} />
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <p className="text-purple-100 text-xs mb-1">Avg per User</p>
                  <p className="text-lg md:text-2xl font-bold">$4,850</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <p className="text-purple-100 text-xs mb-1">Top Earner</p>
                  <p className="text-lg md:text-2xl font-bold">$28.5K</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                  <p className="text-purple-100 text-xs mb-1">This Month</p>
                  <p className="text-lg md:text-2xl font-bold">$295K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Top Category</p>
                  <p className="text-xl font-bold text-gray-900">Design Services</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">45% of all earnings</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-pink-200/50 hover:border-pink-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Star size={24} className="text-pink-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Success Rate</p>
                  <p className="text-xl font-bold text-gray-900">94.7%</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Projects completed successfully</p>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, -20px); }
          66% { transform: translate(-15px, 15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-25px, 20px); }
          66% { transform: translate(20px, -15px); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default DynamicDash;