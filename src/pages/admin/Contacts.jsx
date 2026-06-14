import { useState, useEffect } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import api from '../../utils/api';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/admin/contacts');
      setContacts(res.data);
    } catch (err) { console.error("Error fetching contacts"); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/admin/contacts/${id}/read`);
      fetchContacts();
    } catch (err) { alert("Failed to update status"); }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 bg-slate-50 rounded-t-xl">
        <h3 className="text-lg font-semibold text-slate-800">Client Inquiries</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {contacts.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No new messages.</p>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className={`p-6 flex flex-col md:flex-row gap-4 ${c.is_read ? 'bg-white' : 'bg-blue-50/30'}`}>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-slate-900">{c.name}</h4>
                  {!c.is_read && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">New</span>}
                </div>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Mail size={14} /> {c.email}</span>
                  {c.phone && <span>📞 {c.phone}</span>}
                </div>
                <div className="mt-2 p-3 bg-slate-50 rounded border border-slate-100">
                  <p className="text-sm font-medium mb-1">{c.subject}</p>
                  <p className="text-sm text-slate-600">{c.message}</p>
                </div>
              </div>
              <div className="flex items-start md:justify-end">
                {!c.is_read ? (
                  <button onClick={() => markRead(c.id)} className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded hover:bg-emerald-100">
                    <CheckCircle size={16} /> Mark Read
                  </button>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-slate-400 px-3 py-1.5">
                    <CheckCircle size={16} /> Reviewed
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}