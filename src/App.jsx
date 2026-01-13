import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Testimonials from "./components/Testimonials";
import DynamicDash from "./components/DynamicDash";
import Footer from "./components/Footer";
import Home1 from "./pages/Home1";
import About from "./pages/About";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] via-[#D6C8FF] to-[#C7B5FF]">
     

      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        {/* later you can add */}
        { <Route path="/about" element={<About />} /> }
        { <Route path="/contact" element={<Contact />} /> }
      </Routes>
      <DynamicDash />
      <Testimonials />
       <Footer />
    </div>
  );
}
