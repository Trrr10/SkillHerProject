import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#D6A4DE] pt-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
              🛡
            </div>
            <span className="text-xl font-semibold text-gray-900">
              SafeHer
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            A safe space for women to showcase skills, find opportunities,
            and grow professionally.
          </p>
          <p className="mt-4 text-sm text-orange-500">
            ♡ Made for women, by women
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Get Started</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900">What We Offer</h4>
          <ul className="space-y-2 text-sm">
            <li>Skill Showcase</li>
            <li>Safe Job Listings</li>
            <li>Freelance Services</li>
            <li>Career Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li>✉ hello@safeher.com</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>
              📍 123 Women's Way, Suite 100 <br />
              New York, NY 10001
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t mt-12 py-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
        <p>© 2026 SafeHer. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
