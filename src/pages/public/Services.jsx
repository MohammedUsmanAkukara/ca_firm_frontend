import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Shield, Calculator, ArrowRight } from 'lucide-react';
import api from '../../utils/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/public/services');
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Icon mapping helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Calculator': return <Calculator size={32} className="text-emerald-600" />;
      case 'TrendingUp': return <TrendingUp size={32} className="text-emerald-600" />;
      case 'Shield': return <Shield size={32} className="text-emerald-600" />;
      default: return <Briefcase size={32} className="text-emerald-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Expert Financial Services
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600">
            Comprehensive financial, tax, and advisory solutions designed to help your business thrive in a complex economic landscape.
          </motion.p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(service.icon_name)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <a href="/#contact" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition">
                  Enquire Now <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}