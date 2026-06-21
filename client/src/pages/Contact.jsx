import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import MapPlaceholder from '../components/property/MapPlaceholder';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contact Support</h1>
        <p className="text-xs text-slate-400">Have questions about listings or hosting setups? Let us know.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Form */}
        <motion.div 
          className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-2 text-xs text-emerald-600">
              <CheckCircle size={16} className="shrink-0" />
              <span>Inquiry received! We will reply within 24 business hours.</span>
            </div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message Inquiry</label>
              <textarea 
                required
                placeholder="Describe your inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-colors"
            >
              {sending ? 'Sending...' : 'Send Inquiry Message'}
            </button>
          </form>

          {/* Quick contacts list */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-[10px] text-slate-500 font-semibold">
            <div className="flex flex-col items-center text-center space-y-1">
              <Mail size={16} className="text-primary-500" />
              <span>support@stayfinder.co</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1">
              <Phone size={16} className="text-primary-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1">
              <MapPin size={16} className="text-primary-500" />
              <span>HSR Layout, Bengaluru</span>
            </div>
          </div>

        </motion.div>

        {/* Right Side: Map Coordinates preview */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Office Headquarter Location</span>
          <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            <MapPlaceholder properties={[
              { id: 'office', title: 'StayFinder Office', price: 0, type: 'Office', images: [], amenities: [], city: 'Bengaluru', area: 'HSR Layout' }
            ]} />
          </div>
        </motion.div>

      </div>

    </div>
  );
}
