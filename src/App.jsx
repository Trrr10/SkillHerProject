import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar1";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

import Home1 from "./pages/Home1";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
export default function App() {
   const [user, setUser] = useState(null); // 👈 logged-in user
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#D6C8FF] to-[#C7B5FF]">

     <Navbar
  user={user}
  onLogin={() => setShowLogin(true)}
  onSignup={() => setShowSignup(true)}
  onLogout={() => {
    setUser(null);
    localStorage.removeItem("user");
  }}
/>

      {showLogin && (
       <LoginModal
  onClose={() => setShowLogin(false)}
  onSignup={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
  onSuccess={(userData) => setUser(userData)}
/>
      )}

      {showSignup && (
       <SignupModal
  onClose={() => setShowSignup(false)}
  onSwitch={() => {
    setShowSignup(false);
    setShowLogin(true);
  }}
  onSignupSuccess={(userData) => setUser(userData)}
/>
      )}

      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
<Footer/>
    </div>
  );
}
