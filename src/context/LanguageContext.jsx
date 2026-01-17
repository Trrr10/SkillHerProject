import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    "nav-home": "Home",
    "nav-about": "About",
    "nav-funding": "Fundings",
    "nav-contact": "Contact",
    "nav-login": "Log In",
    "nav-signup": "Sign Up",
    "nav-logout": "Logout",
    "nav-tagline": "Empower. Earn. Thrive.",
  
  /* Home Page */
    "home-title": "Grow with Confidence",
    "home-subtitle": "Start Earning Today.",
    "home-description":
    "Built for women who want to work on their own terms — with safety, dignity, and control.",
    "home-cta-primary": "Get Started Free",
    "home-cta-secondary": "Explore Our Products",

    "home-feature-1": "Verified Employers",
    "home-feature-2": "Secure Payments",
    "home-feature-3": "24/7 Safety Support",

       /* ThreeWays Section */
  "threeways-badge": "Choose Your Path",
  "threeways-title": "Three Ways to Start Earning",
  "threeways-subtitle":
    "No learning required. No waiting. Choose your path and begin immediately.",

  "threeways-card1-badge": "Most Popular",
  "threeways-card1-title": "Show Your Skills",
  "threeways-card1-desc":
    "Upload your resume, add skill tags, build your portfolio. No tests, no certifications—just you.",
  "threeways-card1-btn": "Check Courses",

  "threeways-card2-badge": "Quick Start",
  "threeways-card2-title": "Start Selling",
  "threeways-card2-desc":
    "List your services or digital products. Set your own price. Suggestions help—never block.",
  "threeways-card2-btn": "List a Service",

  "threeways-card3-badge": "Verified",
  "threeways-card3-title": "Find Jobs",
  "threeways-card3-desc":
    "Browse verified opportunities. Remote, part-time, flexible. Apply with your profile.",
  "threeways-card3-btn": "Browse Jobs",

  "threeways-help-title": "Not sure where to start?",
  "threeways-help-desc": "We'll guide you through each step.",
  "threeways-help-btn": "Get Personalized Help",

   /* Dashboard */
"dashboard-badge": "Real-Time Insights",
"dashboard-title": "Our Growing Community",
"dashboard-subtitle":
  "See how women are thriving on our platform every single day",

"dashboard-stat-women": "Active Women",
"dashboard-stat-jobs": "Jobs Posted",
"dashboard-stat-rating": "Platform Rating",
"dashboard-stat-services": "Active Services",

"dashboard-growing": "Growing fast",

"dashboard-earnings-title": "Total Earnings by Women",
"dashboard-growth": "+34% from last period",

"dashboard-avg": "$4,850 Avg",
"dashboard-top": "$28.5K Top",
"dashboard-month": "$295K Month",

"dashboard-top-category": "Top Category",
"dashboard-design": "Design Services",
"dashboard-success-rate": "Success Rate",

/* Footer */
"footer-description": "A safe space for women to showcase skills, find opportunities, and grow professionally.",
"footer-tagline": "Made for women, by women",

"footer-quicklinks-title": "Quick Links",
"footer-link-home": "Home",
"footer-link-about": "About Us",
"footer-link-contact": "Contact",
"footer-link-getstarted": "Get Started",

"footer-offer-title": "What We Offer",
"footer-offer-showcase": "Skill Showcase",
"footer-offer-jobs": "Safe Job Listings",
"footer-offer-freelance": "Freelance Services",
"footer-offer-support": "Career Support",

"footer-contact-title": "Contact Us",
"footer-contact-email-label": "Email",
"footer-contact-phone-label": "Phone",
"footer-contact-address-label": "Address",
"footer-contact-address-line1": "123 Women's Way, Suite 100",
"footer-contact-address-line2": "New York, NY 10001",

"footer-copyright": "© 2026 SkillHer. All rights reserved.",
"footer-policy-privacy": "Privacy Policy",
"footer-policy-terms": "Terms of Service",
"footer-policy-cookies": "Cookie Policy",

  },
  hi: {
    "nav-home": "होम",
    "nav-about": "परिचय",
    "nav-funding": "वित्तपोषण",
    "nav-contact": "संपर्क",
    "nav-login": "लॉग इन",
    "nav-signup": "साइन अप",
    "nav-logout": "लॉगआउट",
    "nav-tagline": "सशक्त बनो। कमाओ। आगे बढ़ो।",

    "home-title": "आत्मविश्वास के साथ आगे बढ़ें",
    "home-subtitle": "आज ही कमाना शुरू करें।",
    "home-description":
      "महिलाओं के लिए बनाया गया, जो अपनी शर्तों पर काम करना चाहती हैं — सुरक्षा, सम्मान और नियंत्रण के साथ।",
    "home-cta-primary": "मुफ़्त में शुरू करें",
    "home-cta-secondary": "हमारे उत्पाद देखें",

    "home-feature-1": "सत्यापित नियोक्ता",
    "home-feature-2": "सुरक्षित भुगतान",
    "home-feature-3": "24/7 सुरक्षा सहायता",


      /* ThreeWays Section */
  "threeways-badge": "अपना रास्ता चुनें",
  "threeways-title": "कमाई शुरू करने के तीन तरीके",
  "threeways-subtitle":
    "कोई सीखने की ज़रूरत नहीं। कोई इंतज़ार नहीं। अपना रास्ता चुनें और तुरंत शुरू करें।",

  "threeways-card1-badge": "सबसे लोकप्रिय",
  "threeways-card1-title": "अपने कौशल दिखाएँ",
  "threeways-card1-desc":
    "अपना रिज़्यूमे अपलोड करें, स्किल टैग जोड़ें, पोर्टफोलियो बनाएँ। कोई टेस्ट नहीं, कोई सर्टिफिकेट नहीं—सिर्फ आप।",
  "threeways-card1-btn": "कोर्स देखें",

  "threeways-card2-badge": "त्वरित शुरुआत",
  "threeways-card2-title": "बेचना शुरू करें",
  "threeways-card2-desc":
    "अपनी सेवाएँ या डिजिटल उत्पाद सूचीबद्ध करें। अपनी कीमत खुद तय करें। सुझाव मदद करते हैं—रोकते नहीं।",
  "threeways-card2-btn": "सेवा सूचीबद्ध करें",

  "threeways-card3-badge": "सत्यापित",
  "threeways-card3-title": "नौकरियाँ खोजें",
  "threeways-card3-desc":
    "सत्यापित अवसर देखें। रिमोट, पार्ट-टाइम, लचीला। अपनी प्रोफ़ाइल से आवेदन करें।",
  "threeways-card3-btn": "नौकरियाँ देखें",

  "threeways-help-title": "कहाँ से शुरू करें समझ नहीं आ रहा?",
  "threeways-help-desc": "हम हर कदम पर आपका मार्गदर्शन करेंगे।",
  "threeways-help-btn": "व्यक्तिगत सहायता प्राप्त करें",

  /* Testimonials */
"testimonials-badge": "Success Stories",
"testimonials-title": "Women Winning with SkillHer",
"testimonials-subtitle":
  "Real stories from real women building careers on their terms",

"testimonials-stat-stories": "Success Stories",
"testimonials-stat-rating": "Average Rating",
"testimonials-stat-satisfaction": "Satisfaction",

/* Testimonials */
"testimonials-badge": "सफलता की कहानियाँ",
"testimonials-title": "SkillHer के साथ सफल महिलाएँ",
"testimonials-subtitle":
  "वास्तविक महिलाओं की वास्तविक कहानियाँ, जो अपनी शर्तों पर करियर बना रही हैं",

"testimonials-stat-stories": "सफलता की कहानियाँ",
"testimonials-stat-rating": "औसत रेटिंग",
"testimonials-stat-satisfaction": "संतुष्टि",

/* Dashboard */
"dashboard-badge": "रीयल-टाइम जानकारी",
"dashboard-title": "हमारा बढ़ता हुआ समुदाय",
"dashboard-subtitle":
  "देखिए कैसे महिलाएं हर दिन हमारे प्लेटफ़ॉर्म पर आगे बढ़ रही हैं",

"dashboard-stat-women": "सक्रिय महिलाएं",
"dashboard-stat-jobs": "पोस्ट की गई नौकरियां",
"dashboard-stat-rating": "प्लेटफ़ॉर्म रेटिंग",
"dashboard-stat-services": "सक्रिय सेवाएं",

"dashboard-growing": "तेज़ी से बढ़ रहा है",

"dashboard-earnings-title": "महिलाओं की कुल कमाई",
"dashboard-growth": "पिछली अवधि से 34% अधिक",

"dashboard-avg": "$4,850 औसत",
"dashboard-top": "$28.5K सर्वोच्च",
"dashboard-month": "$295K मासिक",

"dashboard-top-category": "शीर्ष श्रेणी",
"dashboard-design": "डिज़ाइन सेवाएं",
"dashboard-success-rate": "सफलता दर",

/* Footer */
"footer-description": "महिलाओं के लिए एक सुरक्षित स्थान जहाँ वे कौशल दिखा सकें, अवसर पा सकें और पेशेवर रूप से बढ़ सकें।",
"footer-tagline": "महिलाओं के लिए, महिलाओं द्वारा बनाया गया",

"footer-quicklinks-title": "त्वरित लिंक",
"footer-link-home": "होम",
"footer-link-about": "हमारे बारे में",
"footer-link-contact": "संपर्क",
"footer-link-getstarted": "शुरू करें",

"footer-offer-title": "हम क्या प्रदान करते हैं",
"footer-offer-showcase": "कौशल प्रदर्शन",
"footer-offer-jobs": "सुरक्षित नौकरी सूची",
"footer-offer-freelance": "फ्रीलांस सेवाएं",
"footer-offer-support": "करियर सहायता",

"footer-contact-title": "हमसे संपर्क करें",
"footer-contact-email-label": "ईमेल",
"footer-contact-phone-label": "फोन",
"footer-contact-address-label": "पता",
"footer-contact-address-line1": "123 महिला मार्ग, सुइट 100",
"footer-contact-address-line2": "न्यूयॉर्क, NY 10001",

"footer-copyright": "© 2026 SkillHer. सर्वाधिकार सुरक्षित।",
"footer-policy-privacy": "गोपनीयता नीति",
"footer-policy-terms": "सेवा की शर्तें",
"footer-policy-cookies": "कुकी नीति",

  },
  mr: {
    "nav-home": "मुख्यपृष्ठ",
    "nav-about": "माहिती",
    "nav-funding": "अनुदान",
    "nav-contact": "संपर्क",
    "nav-login": "लॉग इन",
    "nav-signup": "नोंदणी",
    "nav-logout": "लॉगआउट",
    "nav-tagline": "सशक्त व्हा. कमवा. पुढे जा.",

     /* Home Page */
    "home-title": "आत्मविश्वासाने पुढे जा",
    "home-subtitle": "आजच कमाई सुरू करा.",
    "home-description":
      "स्वतःच्या अटींवर काम करू इच्छिणाऱ्या महिलांसाठी — सुरक्षितता, सन्मान आणि नियंत्रणासह.",
    "home-cta-primary": "मोफत सुरू करा",
    "home-cta-secondary": "आमची उत्पादने पहा",

    "home-feature-1": "प्रमाणित नियोक्ते",
    "home-feature-2": "सुरक्षित पेमेंट",
    "home-feature-3": "२४/७ सुरक्षा सहाय्य",

      /* ThreeWays Section */
  "threeways-badge": "तुमचा मार्ग निवडा",
  "threeways-title": "कमाई सुरू करण्याचे तीन मार्ग",
  "threeways-subtitle":
    "शिकण्याची गरज नाही. वाट पाहण्याची गरज नाही. तुमचा मार्ग निवडा आणि लगेच सुरू करा.",

  "threeways-card1-badge": "सर्वाधिक लोकप्रिय",
  "threeways-card1-title": "तुमची कौशल्ये दाखवा",
  "threeways-card1-desc":
    "तुमचा रिझ्युमे अपलोड करा, स्किल टॅग जोडा, पोर्टफोलिओ तयार करा. चाचणी नाही, प्रमाणपत्र नाही—फक्त तुम्ही.",
  "threeways-card1-btn": "कोर्स पहा",

  "threeways-card2-badge": "जलद सुरुवात",
  "threeways-card2-title": "विक्री सुरू करा",
  "threeways-card2-desc":
    "तुमच्या सेवा किंवा डिजिटल उत्पादने सूचीबद्ध करा. किंमत स्वतः ठरवा. सूचना मदत करतात—अडथळा आणत नाहीत.",
  "threeways-card2-btn": "सेवा सूचीबद्ध करा",

  "threeways-card3-badge": "प्रमाणित",
  "threeways-card3-title": "नोकऱ्या शोधा",
  "threeways-card3-desc":
    "प्रमाणित संधी पहा. रिमोट, पार्ट-टाइम, लवचिक. तुमच्या प्रोफाइलद्वारे अर्ज करा.",
  "threeways-card3-btn": "नोकऱ्या पहा",

  "threeways-help-title": "कुठून सुरू करायचे कळत नाही?",
  "threeways-help-desc": "प्रत्येक टप्प्यावर आम्ही तुमचे मार्गदर्शन करू.",
  "threeways-help-btn": "वैयक्तिक मदत मिळवा",

  /* Testimonials */
"testimonials-badge": "यशोगाथा",
"testimonials-title": "SkillHer सोबत यशस्वी महिला",
"testimonials-subtitle":
  "स्वतःच्या अटींवर करिअर घडवणाऱ्या महिलांच्या खऱ्या कथा",

"testimonials-stat-stories": "यशोगाथा",
"testimonials-stat-rating": "सरासरी रेटिंग",
"testimonials-stat-satisfaction": "समाधान",

/* Dashboard */
"dashboard-badge": "रिअल-टाइम माहिती",
"dashboard-title": "आमचा वाढता समुदाय",
"dashboard-subtitle":
  "महिला दररोज आमच्या प्लॅटफॉर्मवर कशा प्रकारे प्रगती करत आहेत ते पहा",

"dashboard-stat-women": "सक्रिय महिला",
"dashboard-stat-jobs": "पोस्ट केलेल्या नोकऱ्या",
"dashboard-stat-rating": "प्लॅटफॉर्म रेटिंग",
"dashboard-stat-services": "सक्रिय सेवा",

"dashboard-growing": "वेगाने वाढत आहे",

"dashboard-earnings-title": "महिलांची एकूण कमाई",
"dashboard-growth": "मागील कालावधीपेक्षा 34% अधिक",

"dashboard-avg": "$4,850 सरासरी",
"dashboard-top": "$28.5K सर्वोत्तम",
"dashboard-month": "$295K मासिक",

"dashboard-top-category": "शीर्ष श्रेणी",
"dashboard-design": "डिझाइन सेवा",
"dashboard-success-rate": "यशाचा दर",

/* Footer */
"footer-description": "महिलांसाठी एक सुरक्षित जागा जिथे ते कौशल्ये दाखवू शकतात, संधी शोधू शकतात आणि व्यावसायिकरित्या वाढू शकतात.",
"footer-tagline": "महिलांसाठी, महिलांनी बनवलेले",

"footer-quicklinks-title": "जलद दुवे",
"footer-link-home": "मुख्यपृष्ठ",
"footer-link-about": "आमच्याबद्दल",
"footer-link-contact": "संपर्क",
"footer-link-getstarted": "सुरू करा",

"footer-offer-title": "आम्ही काय देतो",
"footer-offer-showcase": "कौशल्य प्रदर्शन",
"footer-offer-jobs": "सुरक्षित नोकरी यादी",
"footer-offer-freelance": "फ्रीलान्स सेवा",
"footer-offer-support": "करिअर सहाय्य",

"footer-contact-title": "आमच्याशी संपर्क साधा",
"footer-contact-email-label": "ईमेल",
"footer-contact-phone-label": "फोन",
"footer-contact-address-label": "पत्ता",
"footer-contact-address-line1": "123 महिला मार्ग, सुइट 100",
"footer-contact-address-line2": "न्यूयॉर्क, NY 10001",

"footer-copyright": "© 2026 SkillHer. सर्व हक्क राखीव.",
"footer-policy-privacy": "गोपनीयता धोरण",
"footer-policy-terms": "सेवा अटी",
"footer-policy-cookies": "कुकी धोरण",

  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (fallbackText, key) =>
    translations[language]?.[key] || fallbackText;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};