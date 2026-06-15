import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Star, 
  LogOut, 
  Menu, 
  X,
  Bell,
  UserCircle
} from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Services', icon: <Briefcase size={20} />, path: '/admin/services' },
    { name: 'Contacts', icon: <MessageSquare size={20} />, path: '/admin/contacts' },
    { name: 'Testimonials', icon: <Star size={20} />, path: '/admin/testimonials' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR (Desktop & Mobile) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header / Logo */}
        <div className="h-20 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-2xl font-extrabold text-white tracking-tight cursor-pointer" onClick={() => navigate('/')}>
            CA<span className="text-emerald-500">Firm</span>.
          </span>
          {/* Close button for mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 space-y-1.5">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-2">Management</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // close mobile menu on click
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300 min-h-screen">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden mr-4 text-slate-600 hover:text-emerald-600 p-2 rounded-lg hover:bg-slate-100 transition"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              Admin Portal
            </h2>
          </div>

          {/* Right side Header Items */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-slate-400 hover:text-emerald-600 transition relative p-2 rounded-full hover:bg-slate-50">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-slate-50 transition border border-transparent hover:border-slate-200">
              <UserCircle size={32} className="text-slate-400" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-700 leading-none">Admin User</p>
                <p className="text-xs text-slate-500 mt-1">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT (Yahan par Dashboard, Services, etc. load honge) */}
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>

      </div>

      {/* Mobile Overlay Background (jab sidebar open ho) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
}