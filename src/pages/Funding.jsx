import React, { useState } from "react";
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Award,
  Building2,
  Landmark,
  Users,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  Clock,
  CheckCircle2,
  Star
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Funding = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fundingOpportunities = [
    {
      id: 1,
      type: "government",
      name: "Women Entrepreneurship Platform",
      organization: "NITI Aayog",
      logo: "🏛️",
      amount: "$50K - $500K",
      duration: "12-24 months",
      eligibility: "Women-led startups in India",
      category: "Technology",
      rating: 4.8,
      applications: "2.3K+ funded",
      description: "Government initiative supporting women entrepreneurs with funding, mentorship, and market access.",
      benefits: ["No equity dilution", "Mentorship support", "Market access"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      type: "organization",
      name: "SheEO Venture Fund",
      organization: "SheEO Global",
      logo: "💼",
      amount: "$25K - $100K",
      duration: "6-12 months",
      eligibility: "Women & non-binary founders",
      category: "Social Impact",
      rating: 4.9,
      applications: "1.5K+ funded",
      description: "Radical generosity-based funding model supporting women-led ventures worldwide.",
      benefits: ["Interest-free loans", "Global network", "No equity required"],
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      type: "government",
      name: "Mudra Yojana",
      organization: "Government of India",
      logo: "🏦",
      amount: "$1K - $150K",
      duration: "3-60 months",
      eligibility: "Women entrepreneurs in India",
      category: "General",
      rating: 4.6,
      applications: "50K+ funded",
      description: "Micro-finance scheme providing loans to women entrepreneurs for business development.",
      benefits: ["Low interest rates", "Easy approval", "Flexible repayment"],
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      type: "organization",
      name: "Cartier Women's Initiative",
      organization: "Cartier",
      logo: "💎",
      amount: "$100K - $300K",
      duration: "12 months",
      eligibility: "Early-stage women founders",
      category: "Innovation",
      rating: 4.9,
      applications: "800+ funded",
      description: "International program supporting impactful women-led businesses with funding and mentoring.",
      benefits: ["Grant funding", "Expert mentorship", "Global visibility"],
      color: "from-rose-500 to-red-600"
    },
    {
      id: 5,
      type: "government",
      name: "Stand Up India Scheme",
      organization: "Ministry of Finance",
      logo: "🇮🇳",
      amount: "$15K - $150K",
      duration: "12-84 months",
      eligibility: "SC/ST/Women entrepreneurs",
      category: "Manufacturing/Services",
      rating: 4.7,
      applications: "15K+ funded",
      description: "Facilitating bank loans for setting up greenfield enterprises in manufacturing, services, or trading.",
      benefits: ["Bank loans at low interest", "Handholding support", "Credit guarantee"],
      color: "from-orange-500 to-amber-600"
    },
    {
      id: 6,
      type: "organization",
      name: "Google for Startups",
      organization: "Google",
      logo: "🌐",
      amount: "$50K - $500K",
      duration: "Equity-based",
      eligibility: "Tech startups with women founders",
      category: "Technology",
      rating: 4.8,
      applications: "3K+ funded",
      description: "Supporting women-led tech startups with funding, mentorship, and Google Cloud credits.",
      benefits: ["Cloud credits", "Technical mentorship", "Network access"],
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const stats = [
    { label: "Total Funding Available", value: "$2.5B+", icon: DollarSign, color: "text-green-600 dark:text-green-400" },
    { label: "Active Programs", value: "150+", icon: TrendingUp, color: "text-purple-600 dark:text-purple-400" },
    { label: "Women Funded", value: "50K+", icon: Users, color: "text-pink-600 dark:text-pink-400" },
    { label: "Success Rate", value: "78%", icon: Award, color: "text-blue-600 dark:text-blue-400" }
  ];

  const filteredOpportunities = fundingOpportunities.filter(opp => {
    const matchesTab = activeTab === "all" || opp.type === activeTab;
    const matchesSearch = opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-purple-200 dark:border-purple-700">
            <Sparkles className="w-4 h-4" />
            {t("Funding Opportunities", "funding-badge")}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t("Fund Your", "funding-title-1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {t("Dream Startup", "funding-title-2")}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("Connect with organizations and government schemes designed to support women entrepreneurs. Find the perfect funding match for your venture.", "funding-subtitle")}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color === 'text-green-600 dark:text-green-400' ? 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' : stat.color === 'text-purple-600 dark:text-purple-400' ? 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30' : stat.color === 'text-pink-600 dark:text-pink-400' ? 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30' : 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30'} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("Search funding programs...", "funding-search-placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Filter Icon */}
            <button className="px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2 font-semibold">
              <Filter className="w-5 h-5" />
              {t("Filters", "funding-filter")}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 flex-wrap">
            {[
              { id: "all", label: "All Programs", icon: "🌟" },
              { id: "government", label: "Government", icon: "🏛️" },
              { id: "organization", label: "Organizations", icon: "🏢" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>{tab.icon}</span>
                {t(tab.label, `funding-tab-${tab.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Funding Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${opportunity.color} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/30">
                      {opportunity.logo}
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      <span className="text-white font-bold text-sm">{opportunity.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{opportunity.name}</h3>
                  <p className="text-white/90 text-sm flex items-center gap-2">
                    {opportunity.type === "government" ? <Landmark className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    {opportunity.organization}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {opportunity.description}
                </p>

                {/* Key Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {t("Funding", "funding-amount-label")}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{opportunity.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t("Duration", "funding-duration-label")}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{opportunity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t("Funded", "funding-applications-label")}
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{opportunity.applications}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {opportunity.category}
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-4">
                  {opportunity.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-lg">
                  {t("Apply Now", "funding-apply-btn")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Learn More Link */}
                <button className="w-full mt-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
                  {t("Learn More", "funding-learn-more")}
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("No funding programs found", "funding-no-results-title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("Try adjusting your search or filters", "funding-no-results-subtitle")}
            </p>
          </div>
        )}

      

      </div>
    </section>
  );
};

export default Funding;