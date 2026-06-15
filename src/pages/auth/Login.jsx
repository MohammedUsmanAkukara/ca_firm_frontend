import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link import kiya
import { Mail, Lock, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@cafirm.com');
    setPassword('hb1t7bbknj');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
            CA<span className="text-emerald-600">Firm</span>.
          </span>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to manage services, contacts, and testimonials
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100 text-sm font-medium">
                <AlertCircle size={18} className="shrink-0" /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition sm:text-sm"
                  placeholder="admin@cafirm.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                {/* YAHAN PAR CHANGE KIYA HAI */}
                <Link to="/admin/reset-password" className="font-medium text-emerald-600 hover:text-emerald-500 transition">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In to Dashboard'} <ArrowRight size={18} />
            </button>
          </form>

          {/* DEMO CREDENTIALS BOX */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 mb-1">Demo Access</h4>
                  <p className="text-xs text-emerald-600 mb-3">
                    Use these credentials to explore the admin panel functionality.
                  </p>
                  <button
                    onClick={handleDemoFill}
                    type="button"
                    className="w-full bg-white border border-emerald-200 text-emerald-700 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    Auto-Fill Demo Details
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}