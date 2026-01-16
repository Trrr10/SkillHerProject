import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";
import { Search, ShoppingCart, Filter, Tag, CheckCircle, ArrowRight, Star } from "lucide-react";

const CATEGORIES = ["All", "Crafts", "Beauty", "Education", "Digital Services", "Home Made Food"];

export default function ExploreProducts() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [showAddedToast, setShowAddedToast] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  useEffect(() => {
    let result = services;
    if (activeCategory !== "All") result = result.filter((s) => s.category === activeCategory);
    if (searchQuery) {
      result = result.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredServices(result);
  }, [searchQuery, activeCategory, services]);

  async function fetchServices() {
    const { data, error } = await supabase
      .from("services")
      .select("id, title, description, price, orders_count, image_url, category")
      .order("created_at", { ascending: false });
    if (error) console.error("Error:", error);
    else { setServices(data || []); setFilteredServices(data || []); }
    setLoading(false);
  }

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] px-4 md:px-10 py-12 transition-colors duration-500">
      {/* Dynamic Background Blur Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto mt-10 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-wider uppercase"
            >
              <Star size={12} fill="currentColor" /> Premium Marketplace
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-[1000] text-slate-900 dark:text-white tracking-tight">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Products</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed">
              Supporting women-led businesses, one unique find at a time.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <button className="relative p-4 bg-slate-900 dark:bg-white rounded-2xl group transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none">
              <ShoppingCart className="text-white dark:text-slate-900" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full ring-4 ring-[#f8fafc] dark:ring-[#020617] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR - CATEGORIES */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Collections</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                        activeCategory === cat
                          ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border-l-4 border-purple-600"
                          : "text-slate-500 hover:translate-x-1 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      {cat}
                      <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeCategory === cat ? 'opacity-100' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Card in Sidebar */}
              <div className="hidden lg:block p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs font-bold opacity-80 mb-1">New Collection</p>
                  <p className="font-bold text-lg mb-4">Handmade Crafts</p>
                  <button className="text-[10px] uppercase font-black bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg hover:bg-white/30 transition-all">Shop Now</button>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              </div>
            </div>
          </aside>

          {/* MAIN GRID */}
          <main className="flex-1">
            {loading ? (
              <div className="grid sm:grid-cols-2 gap-8">
                {[1, 2, 4].map((i) => (
                  <div key={i} className="h-96 bg-white dark:bg-slate-900 animate-pulse rounded-[2.5rem]" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
                <AnimatePresence mode="popLayout">
                  {filteredServices.map((service) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={service.id}
                      className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-3 border border-slate-100 dark:border-slate-800/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
                    >
                      <div className="relative h-64 overflow-hidden rounded-[2rem]">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.title}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">No Image</div>
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                           <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-slate-900 dark:text-white shadow-sm">
                            {service.category || "General"}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-1">{service.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{service.price}</p>
                          </div>
                          <button
                            onClick={addToCart}
                            className="bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-purple-200 dark:shadow-none"
                          >
                            <ShoppingCart size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modern Success Toast */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 z-50 font-bold border border-white/10"
          >
            <div className="bg-green-500 p-1 rounded-full"><CheckCircle size={16} className="text-white" /></div>
            Added to your shopping bag
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}