import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar1";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

import Home1 from "./pages/Home1";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import StartSelling from "./pages/StartSelling";



function App() {
  const { user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#D6C8FF] to-[#C7B5FF]">

      <Navbar
        user={user}
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
        onLogout={logout}
      />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onSuccess={(userData) => {
            login(userData);
            setShowLogin(false);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitch={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignupSuccess={(userData) => {
            login(userData);
            setShowSignup(false);
          }}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home1 onLogin={() => setShowLogin(true)} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Home1 onLogin={() => setShowLogin(true)} />}
        />
        <Route
          path="/start-selling"
          element={
          user ? (
          <StartSelling />
           ) : (
          <Home1 onLogin={() => setShowLogin(true)} />
           )  
       }
     />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;