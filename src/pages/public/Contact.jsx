import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react';
import api from '../../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await api.post('/public/contact', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Let's Discuss Your Growth
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-slate-600">
            Whether you need a comprehensive audit, tax advisory, or business structuring, our team of experts is ready to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Our Office</h3>
              <p className="text-slate-600">123 Financial District, Business Park<br/>Mumbai, Maharashtra 400001<br/>India</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Phone</h3>
              <p className="text-slate-600 mb-1">+91 98765 43210</p>
              <p className="text-slate-500 text-sm">Mon-Fri from 9am to 6pm</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Email</h3>
              <p className="text-slate-600 mb-1">contact@cafirm.com</p>
              <p className="text-slate-500 text-sm">We'll reply within 24 hours</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.success && (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-3 border border-emerald-100 font-medium">
                    <CheckCircle size={20} className="shrink-0" /> Inquiry submitted! Our team will contact you shortly.
                  </div>
                )}
                {status.error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100 font-medium">
                    <AlertCircle size={20} className="shrink-0" /> {status.error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition" placeholder="john@company.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                    <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition" placeholder="e.g. Audit Inquiry" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                  <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition resize-none" placeholder="Tell us how we can help your business..."></textarea>
                </div>
                
                <button type="submit" disabled={status.loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {status.loading ? 'Sending Message...' : <><Send size={20} /> Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}