import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote } from 'lucide-react';
import api from '../../utils/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/public/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquareQuote size={32} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Client Success Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600">
            Don't just take our word for it. Read what our valued clients have to say about working with our CA Firm.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading reviews...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-slate-500">More client stories coming soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={t.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                  ))}
                </div>
                <p className="text-slate-700 mb-8 italic flex-grow text-lg leading-relaxed">
                  "{t.review}"
                </p>
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <h4 className="font-bold text-slate-900">{t.client_name}</h4>
                  {t.company && <p className="text-sm text-emerald-600 font-medium">{t.company}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}