import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-[#D6A4DE] min-h-screen text-gray-800">
     
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            Empowering Women to Learn, Earn & Grow
          </h1>
          <p className="text-lg leading-relaxed">
            Our platform is built with a single mission — to support women in
            building financial independence through skill development,
            employment opportunities, and entrepreneurship.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1590650153855-d9e808231d41"
          alt="Women empowerment"
          className="rounded-3xl shadow-2xl"
        />
      </section>

      {/* Our Mission */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-purple-800 mb-6"
          >
            Our Mission
          </motion.h2>
          <p className="text-lg max-w-4xl mx-auto">
            We aim to bridge the gap between learning, certification, employment,
            and small-scale entrepreneurship by offering a trusted and inclusive
            digital ecosystem designed exclusively for women.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Skill Development",
                desc: "Curated learning paths with videos, books, and courses to help women learn in a structured and confidence-building way.",
                img: "https://images.unsplash.com/photo-1584697964192-8c41d6e9c1f2",
              },
              {
                title: "Employment Opportunities",
                desc: "Skill-based job matching that connects women to verified and women-friendly employers.",
                img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
              },
              {
                title: "Women-Owned Marketplace",
                desc: "A safe platform for small business women to sell handmade, homegrown, and self-made products.",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img src={item.img} alt={item.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="bg-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-purple-900 mb-6"
          >
            Why We Exist
          </motion.h2>
          <p className="text-lg max-w-4xl mx-auto">
            Many women face barriers such as scattered learning resources,
            career breaks, lack of certifications, and limited access to safe
            job opportunities. We exist to remove these barriers and provide
            women with a platform they can trust.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-purple-900 mb-6"
        >
          Join Us in Building a Stronger Future for Women
        </motion.h2>
        <p className="mb-8 text-lg">
          Learn a skill, find a job, or grow your small business — all in one place.
        </p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full text-lg shadow-lg transition">
          Get Started
        </button>
      </section>

    </div>
  );
}
