import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Home from "./pages/Home";
import About from "./pages/About"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* later you can add */}
        { <Route path="/about" element={<About />} /> }
      
      </Routes>
    </div>
  );
}
