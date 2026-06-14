import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import api from '../../utils/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    id: null, client_name: '', company: '', review: '', rating: 5, is_approved: true 
  });

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/admin/testimonials');
      setTestimonials(res.data);
    } catch (err) { console.error("Error fetching testimonials"); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/admin/testimonials/${formData.id}`, formData);
      } else {
        await api.post('/admin/testimonials', formData);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) { alert("Failed to save testimonial"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) { alert("Failed to delete"); }
  };

  const openEdit = (testimonial) => {
    setFormData(testimonial);
    setIsModalOpen(true);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Client Testimonials</h3>
          <p className="text-sm text-slate-500 mt-1">Manage what clients say about your CA firm.</p>
        </div>
        <button onClick={() => { setFormData({ id: null, client_name: '', company: '', review: '', rating: 5, is_approved: true }); setIsModalOpen(true); }} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4 font-medium">Client Info</th>
              <th className="p-4 font-medium">Review</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testimonials.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No testimonials found.</td></tr>
            ) : (
              testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{t.client_name}</p>
                    <p className="text-xs text-slate-500">{t.company}</p>
                  </td>
                  <td className="p-4 text-slate-600 max-w-sm"><p className="line-clamp-2">{t.review}</p></td>
                  <td className="p-4 flex items-center gap-1 mt-2">{renderStars(t.rating)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${t.is_approved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                      {t.is_approved ? 'Public' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEdit(t)} className="text-blue-600 hover:text-blue-800 transition"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-800 transition"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800">{formData.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                  <input type="text" required value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Tech Corp" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1 to 5)</label>
                <select value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                <textarea required rows="3" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" placeholder="What did the client say?"></textarea>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input type="checkbox" id="isApproved" checked={formData.is_approved} onChange={e => setFormData({...formData, is_approved: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <label htmlFor="isApproved" className="text-sm font-medium text-slate-700">Show on public website</label>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}