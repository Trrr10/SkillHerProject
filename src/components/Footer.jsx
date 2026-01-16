import React from "react";
import { Mail, Phone, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 pt-16 pb-8 px-6 overflow-hidden">
      
      {/* Decorative elements with animation */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse animation-delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-white/90 mb-12">

          {/* Brand Section - Enhanced */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4 cursor-pointer">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></div>
                <span className="text-2xl relative z-10">🛡️</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                SKillHer
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/80 mb-4">
              {t('A safe space for women to showcase skills, find opportunities, and grow professionally.', 'footer-description')}
            </p>
            <div className="flex items-center gap-2 text-pink-300 cursor-pointer group/heart hover:scale-105 transition-transform duration-300">
              <Heart className="w-4 h-4 fill-pink-300 group-hover/heart:fill-pink-200 group-hover/heart:animate-pulse" />
              <span className="text-sm font-medium group-hover/heart:text-pink-200">{t('Made for women, by women', 'footer-tagline')}</span>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div>
            <h4 className="font-bold mb-5 text-white text-lg flex items-center gap-2">
              {t('Quick Links', 'footer-quicklinks-title')}
              <Sparkles className="w-4 h-4 text-purple-300" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', key: 'footer-link-home' },
                { label: 'About Us', key: 'footer-link-about' },
                { label: 'Contact', key: 'footer-link-contact' },
                { label: 'Get Started', key: 'footer-link-getstarted' }
              ].map((link, index) => (
                <li key={link.key} style={{ animationDelay: `${index * 50}ms` }}>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group cursor-pointer relative"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    <span className="relative">
                      {t(link.label, link.key)}
                      {/* Underline effect */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Offer - Enhanced */}
          <div>
            <h4 className="font-bold mb-5 text-white text-lg flex items-center gap-2">
              {t('What We Offer', 'footer-offer-title')}
              <span className="text-xl">✨</span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Skill Showcase', emoji: '🎨', key: 'footer-offer-showcase' },
                { name: 'Safe Job Listings', emoji: '💼', key: 'footer-offer-jobs' },
                { name: 'Freelance Services', emoji: '💰', key: 'footer-offer-freelance' },
                { name: 'Career Support', emoji: '🚀', key: 'footer-offer-support' }
              ].map((service, index) => (
                <li key={service.key} style={{ animationDelay: `${index * 50}ms` }}>
                  <a 
                    href="#" 
                    className="text-sm text-white/80 hover:text-white hover:translate-x-2 inline-flex items-center gap-2 transition-all duration-300 group cursor-pointer relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{service.emoji}</span>
                    <span className="relative">
                      {t(service.name, service.key)}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us - Enhanced */}
          <div>
            <h4 className="font-bold mb-5 text-white text-lg flex items-center gap-2">
              {t('Contact Us', 'footer-contact-title')}
              <span className="text-xl">📱</span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                  <Mail className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-sm">
                  <p className="text-white/60 text-xs mb-1 group-hover:text-white/80 transition-colors">{t('Email', 'footer-contact-email-label')}</p>
                  <p className="text-white/90 group-hover:text-white transition-colors font-medium group-hover:underline">hello@safeher.com</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-pink-500/50">
                  <Phone className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors duration-300 group-hover:animate-pulse" />
                </div>
                <div className="text-sm">
                  <p className="text-white/60 text-xs mb-1 group-hover:text-white/80 transition-colors">{t('Phone', 'footer-contact-phone-label')}</p>
                  <p className="text-white/90 group-hover:text-white transition-colors font-medium group-hover:underline">+1 (555) 123-4567</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-teal-500/50">
                  <MapPin className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors duration-300 group-hover:animate-bounce" />
                </div>
                <div className="text-sm">
                  <p className="text-white/60 text-xs mb-1 group-hover:text-white/80 transition-colors">{t('Address', 'footer-contact-address-label')}</p>
                  <p className="text-white/90 group-hover:text-white transition-colors leading-relaxed font-medium">
                    {t('123 Women\'s Way, Suite 100', 'footer-contact-address-line1')}<br />
                    {t('New York, NY 10001', 'footer-contact-address-line2')}
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider with animation */}
        <div className="relative h-px mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-shimmer"></div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p className="hover:text-white transition-colors duration-300 cursor-default">{t('© 2026 SkillHer. All rights reserved.', 'footer-copyright')}</p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy', key: 'footer-policy-privacy' },
              { label: 'Terms of Service', key: 'footer-policy-terms' },
              { label: 'Cookie Policy', key: 'footer-policy-cookies' }
            ].map((policy) => (
              <a 
                key={policy.key}
                href="#" 
                className="hover:text-white transition-all duration-300 hover:underline cursor-pointer relative group"
              >
                {t(policy.label, policy.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media Icons - Enhanced */}
        <div className="flex justify-center gap-4 mt-8">
          {[
            { emoji: '💜', color: 'from-purple-500 to-purple-600' },
            { emoji: '🌸', color: 'from-pink-500 to-pink-600' },
            { emoji: '✨', color: 'from-yellow-400 to-orange-500' }
          ].map((social, i) => (
            <div 
              key={i}
              className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 border border-white/20 hover:border-white/40 group overflow-hidden"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <span className="text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">{social.emoji}</span>
            </div>
          ))}
        </div>

        {/* Extra: Floating particles effect */}
        <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400/50 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400/50 rounded-full animate-ping animation-delay-1000"></div>

      </div>
    </footer>
  );
};

export default Footer;