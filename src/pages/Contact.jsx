import React from "react";

const ContactUs = () => {
  return (
    <main className="min-h-screen bg-[#D6A4DE]">

      <section className="pt-28 pb-24 text-center">
        <div className="max-w-3xl mx-auto px-4">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-white/20 text-white border border-white/30 text-sm mb-6">
            💬 Get in Touch
          </div>

          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
            We're here to <span className="text-white/90">help</span>
          </h1>

          <p className="text-white/80 text-lg">
            Have questions or need support? Reach out to our friendly team.
          </p>

        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl p-10 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
              ✉
            </div>
            <h3 className="font-serif text-xl mb-2">Email Us</h3>
            <p className="text-gray-800 font-medium">hello@safeher.com</p>
            <p className="text-sm text-gray-500 mt-2">
              We'll respond within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
              ☎
            </div>
            <h3 className="font-serif text-xl mb-2">Call Us</h3>
            <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500 mt-2">
              Mon–Fri, 9am–6pm EST
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
              📍
            </div>
            <h3 className="font-serif text-xl mb-2">Visit Us</h3>
            <p className="text-gray-800 font-medium">
              123 Women's Way, Suite 100
            </p>
            <p className="text-sm text-gray-500 mt-1">
              New York, NY 10001
            </p>
          </div>

        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <div>
            <h2 className="text-3xl font-serif text-white mb-2">
              Send us a message
            </h2>
            <p className="text-white/80 mb-8">
              Fill out the form below and we'll get back to you soon.
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-full px-6 py-4 bg-white/70 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-full px-6 py-4 bg-white/70 focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full rounded-2xl px-6 py-4 bg-white/70 focus:outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full 
                           text-white font-medium bg-gradient-to-r from-orange-400 to-pink-500 
                           hover:opacity-90 transition"
              >
                ✈ Send Message
              </button>
            </form>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-[420px]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Google%20NYC%209th%20Avenue&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </section>

    </main>
  );
};

export default ContactUs;
