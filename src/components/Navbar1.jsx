import { Link } from "react-router-dom";

export default function Navbar({ onLogin, onSignup }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <h1 className="text-xl font-bold">SkillHer</h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <Link to="/about" className="hover:text-purple-600">About</Link>
        <Link to="/contact" className="hover:text-purple-600">Contact</Link>

        <button
          onClick={onLogin}
          className="px-4 py-1 border rounded hover:bg-gray-100"
        >
          Log In
        </button>

        <button
          onClick={onSignup}
          className="px-4 py-1 bg-purple-600 text-white rounded"
        >
          Join Free
        </button>
      </div>
    </nav>
  );
}
