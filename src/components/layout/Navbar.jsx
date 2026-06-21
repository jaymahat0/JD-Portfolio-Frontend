import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaLock, FaSignOutAlt, FaColumns } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:rounded-full transition-all duration-300"
      : "text-slate-300 hover:text-cyan-400 transition-colors duration-300";

  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-90 transition duration-300"
        >
          JAYDEV
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkStyle}>
            Projects
          </NavLink>
          <NavLink to="/skills" className={navLinkStyle}>
            Skills
          </NavLink>
          <NavLink to="/education" className={navLinkStyle}>
            Education
          </NavLink>
          <NavLink to="/experience" className={navLinkStyle}>
            Experience
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 border-l border-slate-800 pl-4">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition duration-300 text-sm font-medium"
              >
                <FaColumns className="text-xs" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3.5 py-1.5 rounded-lg transition duration-300 text-sm font-medium cursor-pointer"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 px-3.5 py-1.5 rounded-lg transition duration-300 text-sm font-medium"
            >
              <FaLock className="text-xs" />
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-6 pb-6 gap-4 bg-slate-950/95 border-b border-slate-900 transition-all duration-300">
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

          {isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-850">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 py-1"
                onClick={() => setOpen(false)}
              >
                <FaColumns size={14} />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2 rounded-lg transition cursor-pointer"
              >
                <FaSignOutAlt size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-300 py-2 rounded-lg transition"
              onClick={() => setOpen(false)}
            >
              <FaLock size={12} />
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
