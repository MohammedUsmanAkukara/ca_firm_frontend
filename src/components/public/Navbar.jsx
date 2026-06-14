import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              CA<span className="text-emerald-600">Firm</span>.
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center bg-white/80 backdrop-blur-lg px-8 py-3 rounded-full border border-slate-100 shadow-sm">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  text-sm font-semibold transition-colors hover:text-emerald-600
                  ${isActive ? 'text-emerald-600' : 'text-slate-600'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button onClick={() => navigate('/contact')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-md flex items-center gap-2 group">
              Contact Us <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center bg-white p-2 rounded-full shadow-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-emerald-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl pb-6 pt-2 px-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  block px-4 py-3 rounded-xl text-base font-semibold
                  ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:bg-slate-50'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
            <button onClick={() => navigate('/contact')} className="w-full mt-4 bg-emerald-600 text-white px-6 py-3.5 rounded-xl text-base font-semibold hover:bg-emerald-700 transition">
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}