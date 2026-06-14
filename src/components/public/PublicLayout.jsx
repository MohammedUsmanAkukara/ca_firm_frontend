import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Yahan par Home ya Services page load hoga */}
        <Outlet />
      </main>
      <footer className="bg-slate-900 py-12 text-center text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-white mb-2">CA Firm.</h3>
          <p>© {new Date().getFullYear()} All rights reserved. Professional Chartered Accountants.</p>
        </div>
      </footer>
    </div>
  );
}