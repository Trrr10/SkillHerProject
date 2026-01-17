import { supabase } from "../supabaseClient";
import "../StartSelling.css";
import React, { useState } from "react";
import { UploadCloud, ShieldCheck, Sparkles, Star, CheckCircle2 } from "lucide-react";

export default function StartSelling() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    category: "Crafts",
    deliveryTime: "",
    experienceLevel: "Beginner",
    image: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const uploadServiceImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("service-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a service image");
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("You must be logged in to publish a service");
      return;
    }

    try {
      const imageUrl = await uploadServiceImage(formData.image);

      const { error } = await supabase.from("services").insert([
        {
          user_id: user.id,
          title: formData.serviceName,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          orders_count: 0,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;
      alert("Service published successfully! 🚀");

      setFormData({
        serviceName: "",
        description: "",
        price: "",
        category: "Crafts",
        deliveryTime: "",
        experienceLevel: "Beginner",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Improved Input Styles for Dark Mode
  const inputStyle = "mt-1 w-full rounded-xl px-4 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="relative min-h-screen px-4 py-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Background Glows adjusted for Dark Mode */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-pink-400/20 dark:bg-pink-900/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* HERO SECTION */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-semibold mb-4">
          <Sparkles size={16} />
          <span>Join 5,000+ Women Entrepreneurs</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
          List Your Service
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Turn your unique skills into a thriving business. 💜
        </p>
      </div>

      {/* TRUST STRIP */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { text: "Reach genuine buyers", icon: <ShieldCheck className="text-purple-500" /> },
          { text: "Women-first safe platform", icon: <CheckCircle2 className="text-pink-500" /> },
          { text: "Edit or remove anytime", icon: <Sparkles className="text-indigo-500" /> },
        ].map((item, i) => (
          <div key={i} className="trust-card flex items-center gap-4 px-6 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
            {item.icon}
            <span className="text-gray-700 dark:text-slate-300 font-bold tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* FORM SIDE */}
        <div className="lg:col-span-2 form-container bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-black ml-1 mb-1">Service Name</label>
                <input name="serviceName" value={formData.serviceName} onChange={handleChange} placeholder="Eg: Handmade Soy Candles" className={inputStyle} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-black ml-1 mb-1">Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Eg: 999" className={inputStyle} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-black ml-1 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className={inputStyle}>
                  <option>Crafts</option>
                  <option>Beauty</option>
                  <option>Education</option>
                  <option>Digital Services</option>
                  <option>Home Made Food</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black ml-1 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="What makes your service special?" className={inputStyle} required />
            </div>

            {/* UPLOAD BOX */}
            <div className="upload-box group p-12 text-center relative border-2 border-dashed border-purple-100 dark:border-slate-800 rounded-3xl cursor-pointer bg-slate-50 dark:bg-slate-950/50 hover:border-purple-400 transition-colors">
              <UploadCloud className="mx-auto mb-4 h-12 w-12 text-purple-400 group-hover:scale-110 duration-300" />
              <p className="font-bold text-lg dark:text-slate-200">{formData.image ? formData.image.name : "Upload product images"}</p>
              <p className="text-sm opacity-60 dark:text-slate-400">Drag and drop or click to browse</p>
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>

            <button type="submit" className="publish-btn w-full py-4 rounded-2xl text-white font-bold text-xl shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-[0.98]">
              Publish Listing 🚀
            </button>
          </form>
        </div>

        {/* INFO SIDEBAR */}
        <div className="space-y-8">
          <div className="info-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 border-t-4 border-t-purple-500 rounded-2xl shadow-lg">
            <h3 className="font-black text-gray-800 dark:text-slate-100 text-xl mb-4">Live Preview</h3>
            <div className="example-card p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="w-full h-32 bg-gray-200 dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                {formData.image ? <img src={URL.createObjectURL(formData.image)} className="w-full h-full object-cover" /> : "Image Preview"}
              </div>
              <p className="font-bold text-purple-700 dark:text-purple-400">{formData.serviceName || "Your Service Name"}</p>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">₹{formData.price || "0"} · {formData.category}</p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="info-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg">
            <h3 className="font-black text-purple-700 dark:text-purple-400 text-lg mb-4">Listing Guidelines</h3>
            <ul className="space-y-4">
              {["Use high-quality bright photos", "Be specific about delivery times", "Mention if items are customizable", "Keep pricing transparent"].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-slate-400 font-medium">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 text-[10px]">✓</div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Motivation Card */}
          <div className="motivation-card p-8 rounded-[2rem] text-center floating bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/20">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-white/80" />
            <h4 className="text-2xl font-bold mb-2">Ready to Shine?</h4>
            <p className="text-sm leading-relaxed text-white/90">
              Your talent is unique. We're here to make sure the world sees it. Start your journey today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}