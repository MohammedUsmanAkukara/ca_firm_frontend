import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import api from '../../utils/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', description: '', icon_name: 'Briefcase', is_active: true });

  const fetchServices = async () => {
    try {
      const res = await api.get('/public/services');
      setServices(res.data);
    } catch (err) { console.error("Error fetching services"); }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/admin/services/${formData.id}`, formData);
      } else {
        await api.post('/admin/services', formData);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) { alert("Failed to save service"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (err) { alert("Failed to delete"); }
  };

  const openEdit = (service) => {
    setFormData(service);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
        <h3 className="text-lg font-semibold text-slate-800">Manage Website Services</h3>
        <button onClick={() => { setFormData({ id: null, title: '', description: '', icon_name: 'Briefcase', is_active: true }); setIsModalOpen(true); }} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-900">{s.title}</td>
                <td className="p-4 text-slate-500 truncate max-w-xs">{s.description}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${s.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{s.is_active ? 'Active' : 'Draft'}</span></td>
                <td className="p-4 flex justify-end gap-3">
                  <button onClick={() => openEdit(s)} className="text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">{formData.id ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-emerald-600" />
                <label className="text-sm">Active on website</label>
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}