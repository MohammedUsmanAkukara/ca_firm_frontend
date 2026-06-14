import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  
  // Fetch top 3 services for the preview section
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/public/services');
        setServices(res.data.slice(0, 3));
      } catch (err) { console.error("Failed to load services"); }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. HERO SECTION (Modern & Spacious) */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700">
            Trusted CA Firm in India
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Strategic Financial <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Intelligence.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            We provide expert tax structuring, audit assurance, and financial advisory to help businesses scale with compliance and confidence.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/contact')} className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
              Book Consultation <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/services')} className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition flex items-center justify-center">
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            <div>
              <p className="text-4xl font-extrabold text-white mb-2">15+</p>
              <p className="text-slate-400 font-medium">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">500+</p>
              <p className="text-slate-400 font-medium">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white mb-2">₹10B+</p>
              <p className="text-slate-400 font-medium">Assets Advised</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">100%</p>
              <p className="text-slate-400 font-medium">Compliance Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SNIPPET SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-emerald-100 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <ShieldCheck size={48} className="text-emerald-600 mb-4" />
                  <h4 className="font-bold text-slate-900">Secure</h4>
                </div>
                <div className="bg-white border border-slate-100 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <Award size={48} className="text-slate-800 mb-4" />
                  <h4 className="font-bold text-slate-900">Certified</h4>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white border border-slate-100 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center shadow-sm">
                  <Users size={48} className="text-blue-600 mb-4" />
                  <h4 className="font-bold text-slate-900">Expert Team</h4>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl aspect-square flex flex-col justify-center items-center text-center">
                  <TrendingUp size={48} className="text-emerald-400 mb-4" />
                  <h4 className="font-bold text-white">Growth</h4>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-3">Why Choose Us</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Beyond Accounting. <br/> We Drive Growth.</h3>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                We don't just crunch numbers. We provide actionable insights that help you minimize risks and maximize profitability. Our team of certified professionals ensures your business stays compliant while scaling efficiently.
              </p>
              <ul className="space-y-4 mb-8">
                {['Personalized Tax Strategies', 'End-to-end Audit Support', 'Corporate Financial Planning'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><ShieldCheck size={14} /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/about')} className="text-emerald-600 font-bold hover:text-emerald-700 transition flex items-center gap-2">
                More About Our Firm <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-emerald-600 tracking-wider uppercase mb-3">Our Expertise</h2>
              <h3 className="text-4xl font-extrabold text-slate-900">Tailored Services for Your Success</h3>
            </div>
            <button onClick={() => navigate('/services')} className="hidden md:flex items-center gap-2 text-slate-600 font-semibold hover:text-emerald-600 transition">
              View All Services <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:bg-slate-900 hover:text-white transition-colors duration-300 group cursor-pointer" onClick={() => navigate('/services')}>
                <h4 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-white">{service.title}</h4>
                <p className="text-slate-600 group-hover:text-slate-300 leading-relaxed mb-8 line-clamp-3">
                  {service.description}
                </p>
                <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all text-slate-400 group-hover:text-white mt-auto">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/services')} className="md:hidden mt-8 w-full flex justify-center items-center gap-2 text-slate-900 font-bold border border-slate-200 py-4 rounded-xl">
            View All Services <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to optimize your finances?</h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation with our lead CA to discuss your tax and business goals.
          </p>
          <button onClick={() => navigate('/contact')} className="bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-slate-800 transition shadow-xl inline-flex items-center gap-3">
            Get in Touch Now <ArrowRight size={22} />
          </button>
        </div>
      </section>

    </div>
  );
}