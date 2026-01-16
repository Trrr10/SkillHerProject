import React, { useState } from "react";
import { X, Briefcase, MapPin, DollarSign, Clock, CheckCircle2, Upload } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function JobDetailsModal({ job, onClose, userSkills }) {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const hasApplied = job.applicationStatus !== null && job.applicationStatus !== undefined;
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    email: "",
    phone: "",
    experience_years: "",
    cover_letter: "",
    resume_url: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    // Check file type
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF and DOC/DOCX files are allowed");
      return;
    }

    setResumeFile(file);
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data, error } = await supabase.storage
        .from("applications")
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("applications")
        .getPublicUrl(filePath);

      setFormData({ ...formData, resume_url: publicUrlData.publicUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume_url) {
      alert("Please upload your resume");
      return;
    }

    try {
      const { error } = await supabase.from("applications").insert({
        user_id: user.id,
        job_id: job.id,
        status: "applied",
        full_name: formData.full_name,
        age: parseInt(formData.age),
        email: formData.email,
        phone: formData.phone,
        experience_years: parseInt(formData.experience_years),
        resume_url: formData.resume_url,
        cover_letter: formData.cover_letter
      });

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const hasMinSkills = userSkills.length >= 3;

  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-3xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{job.title}</h2>
              <p className="text-purple-100 text-lg">{job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
              <Briefcase className="w-4 h-4" />
              {job.type}
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
              <Clock className="w-4 h-4" />
              {job.posted_time}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showApplicationForm ? (
            <>
              {/* Job Description */}
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About the Role</h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </section>

              {/* Experience Required */}
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Experience Required</h3>
                <p className="text-gray-700">{job.experience_required}</p>
              </section>

              {/* Requirements */}
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Responsibilities */}
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities?.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Apply Button */}
              {/* Apply Button or Status */}
<div className="sticky bottom-0 bg-white pt-4 border-t">
  {hasApplied ? (
    <div className={`w-full py-3 rounded-xl text-base font-semibold text-center ${
      job.applicationStatus === 'applied' 
        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
        : job.applicationStatus === 'shortlisted'
        ? 'bg-green-100 text-green-700 border-2 border-green-300'
        : job.applicationStatus === 'rejected'
        ? 'bg-red-100 text-red-700 border-2 border-red-300'
        : 'bg-gray-100 text-gray-700'
    }`}>
      {job.applicationStatus === 'applied' && '✓ Application Submitted'}
      {job.applicationStatus === 'shortlisted' && '🎉 You\'ve been Shortlisted!'}
      {job.applicationStatus === 'rejected' && 'Application Not Selected'}
    </div>
  ) : (
    <button
      onClick={() => setShowApplicationForm(true)}
      disabled={!hasMinSkills}
      className={`w-full py-3 rounded-xl text-base font-semibold transition-all ${
        hasMinSkills
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      {hasMinSkills ? "Apply for this Position" : "🔒 Select 3 skills to apply"}
    </button>
  )}
</div>
            </>
          ) : submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600">We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <>
              {/* Application Form */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply for {job.title}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="50"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Resume * (PDF or DOC, max 5MB)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      required={!formData.resume_url}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">
                        {uploading
                          ? "Uploading..."
                          : resumeFile
                          ? resumeFile.name
                          : "Click to upload resume"}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={formData.cover_letter}
                    onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !formData.resume_url}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}