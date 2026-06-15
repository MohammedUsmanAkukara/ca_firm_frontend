import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      // API call to send reset email (Adjust endpoint if your backend uses a different route)
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'Password reset link sent to your email.');
      setEmail(''); // clear input on success
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
            CA<span className="text-emerald-600">Firm</span>.
          </span>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter your email to receive a password reset link
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          
          {/* SUCCESS MESSAGE */}
          {message ? (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 mb-4">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Check your email</h3>
              <p className="text-sm text-slate-600 mb-6 px-4 leading-relaxed">
                We've sent a password reset link to your email address. Please check your inbox (and spam folder).
              </p>
              <Link 
                to="/admin/login" 
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={18} /> Back to Login
              </Link>
            </motion.div>
          ) : (
            /* RESET FORM */
            <form className="space-y-6" onSubmit={handleReset}>
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

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending Link...' : 'Send Reset Link'} <Send size={18} />
              </button>

              <div className="text-center mt-4">
                <Link to="/admin/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
}