import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Trash2, Search, Inbox } from 'lucide-react';
import api from '../../utils/api';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/admin/contacts');
        setContacts(res.data);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      try {
        await api.delete(`/admin/contacts/${id}`);
        // UI se turant hata dein bina refresh kiye
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        console.error("Failed to delete contact", error.message);
        alert("Failed to delete the message. Please try again.");
      }
    }
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-slate-500 font-medium">Loading messages...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and respond to client messages</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition shadow-sm text-sm"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No messages found</h3>
          <p className="text-slate-500">Your inbox is clean and empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredContacts.map((contact, idx) => (
            <motion.div 
              key={contact._id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              {/* Delete Button (Top Right) */}
              <button 
                onClick={() => handleDelete(contact.id)}
                className="absolute top-6 right-6 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Message"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex justify-between items-start mb-4 pr-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">{contact.subject}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <a href={`mailto:${contact.email}`} className="hover:text-emerald-600 transition">{contact.email}</a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" />
                    <a href={`tel:${contact.phone}`} className="hover:text-emerald-600 transition">{contact.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span>{new Date(contact.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed">
                {contact.message}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}