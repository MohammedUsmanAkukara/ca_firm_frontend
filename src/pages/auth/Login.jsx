import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '../../utils/api'; // API import

export default function Login() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.error || 'Login failed', success: '' });
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setStatus({ loading: false, error: '', success: response.data.message });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.error || 'Failed to send link', success: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isForgotPassword ? 'Reset Password' : 'CA Admin Login'}
            </h2>
            <p className="text-slate-400">
              {isForgotPassword ? 'Enter email for reset link' : 'Secure access to your dashboard'}
            </p>
          </div>

          {status.error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex gap-2 text-red-400 text-sm">
              <AlertCircle size={18} /> {status.error}
            </div>
          )}
          {status.success && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-3 flex gap-2 text-emerald-400 text-sm">
              <CheckCircle size={18} /> {status.success}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isForgotPassword ? (
              <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="admin@cafirm.com" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-slate-300">Password</label>
                    <button type="button" onClick={() => { setIsForgotPassword(true); setStatus({ error: '', success: '', loading: false }); }} className="text-sm text-emerald-500 hover:text-emerald-400">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="••••••••" />
                  </div>
                </div>
                <button type="submit" disabled={status.loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50">
                  {status.loading ? 'Signing in...' : 'Sign In'}
                </button>
              </motion.form>
            ) : (
              <motion.form key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleForgot} className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
                <button type="submit" disabled={status.loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50">
                  {status.loading ? 'Sending...' : 'Send Link'}
                </button>
                <button type="button" onClick={() => { setIsForgotPassword(false); setStatus({ error: '', success: '', loading: false }); }} className="w-full py-3 flex justify-center items-center gap-2 text-slate-300 hover:bg-slate-700 rounded-lg transition">
                  <ArrowLeft size={16} /> Back to Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}