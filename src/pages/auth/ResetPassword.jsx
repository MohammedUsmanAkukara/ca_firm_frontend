import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../utils/api';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token) return setStatus({ loading: false, error: 'Invalid token', success: '' });
    
    setStatus({ loading: true, error: '', success: '' });
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      setStatus({ loading: false, error: '', success: response.data.message });
      setTimeout(() => navigate('/admin/login'), 3000);
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.error || 'Failed to reset', success: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Password</h2>
        
        {status.error && <div className="mb-4 bg-red-500/10 text-red-400 p-3 rounded-lg flex gap-2 text-sm"><AlertCircle size={18} /> {status.error}</div>}
        {status.success && <div className="mb-4 bg-emerald-500/10 text-emerald-400 p-3 rounded-lg flex gap-2 text-sm"><CheckCircle size={18} /> {status.success} Redirecting...</div>}

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-300 mb-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
          <button type="submit" disabled={!token || status.loading || status.success} className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50">
            {status.loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}