import { motion } from 'framer-motion';
import { Target, Shield, Zap, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <Shield size={24} />, title: "Uncompromising Integrity", desc: "We uphold the highest ethical standards in every financial assessment and advisory role we undertake." },
    { icon: <Target size={24} />, title: "Precision & Accuracy", desc: "In our line of work, every digit matters. We ensure flawless compliance and immaculate financial reporting." },
    { icon: <Zap size={24} />, title: "Proactive Advisory", desc: "We don't just record history; we help you write it by forecasting trends and optimizing your tax strategies." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans">
      
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-20 mt-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold mb-6">
            Building Financial Excellence
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-slate-300 max-w-3xl mx-auto">
            A legacy of trust, expertise, and strategic growth. We are more than accountants; we are your financial partners.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">A decade of empowering businesses to scale securely.</h3>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Founded on the principles of transparency and deep financial acumen, our firm has grown from a boutique tax consultancy into a full-scale corporate advisory powerhouse.
              </p>
              <p>
                We understand that modern businesses operate in a complex, ever-changing regulatory environment. Our mission is to simplify this complexity, allowing founders and management to focus on what they do best: growing their business.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-sm text-slate-500 font-medium">Tax Filings</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-3xl font-bold text-slate-900">₹50B+</p>
                <p className="text-sm text-slate-500 font-medium">Audited Revenue</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-96 bg-slate-200 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            {/* Placeholder for Firm Image/Office */}
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500">
              <span className="text-lg font-medium">[Office / Team Image Placeholder]</span>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">The pillars that define our work culture and client relationships.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h4>
                <p className="text-slate-600 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}