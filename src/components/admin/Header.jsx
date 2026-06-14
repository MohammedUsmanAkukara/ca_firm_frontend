import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react'; // Menu icon import kiya

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const title = location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1);

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu - Only visible on mobile */}
        <button onClick={toggleSidebar} className="md:hidden text-slate-600 hover:text-emerald-600 transition">
          <Menu size={24} />
        </button>
        {/* Title - Hidden on very small screens to save space */}
        <h2 className="text-xl font-semibold text-slate-800 hidden sm:block">{title}</h2>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <User size={16} /> <span className="hidden sm:inline">Admin</span>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
        >
          <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}