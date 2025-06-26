import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">MiniKYC</h1>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      <ul className={`md:flex md:items-center gap-6 ${isOpen ? "block mt-4" : "hidden"} md:block`}>
        <li><Link to="/" className="text-gray-700 hover:text-blue-600">Form</Link></li>
        <li><Link to="/admin" className="text-gray-700 hover:text-blue-600">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;