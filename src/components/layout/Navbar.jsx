import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Portfolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/projects" className={navLinkStyle}>
            Projects
          </NavLink>

          <NavLink to="/skills" className={navLinkStyle}>
            Skills
          </NavLink>

          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-4 bg-white">

          <NavLink
            to="/"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Projects
          </NavLink>

          <NavLink
            to="/skills"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Skills
          </NavLink>

          <NavLink
            to="/education"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Education
          </NavLink>

          <NavLink
            to="/experience"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Experience
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkStyle}
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>

        </div>
      )}
    </nav>
  );
}

export default Navbar;