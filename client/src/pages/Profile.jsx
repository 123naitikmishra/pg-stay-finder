import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { User, Phone, Mail, Shield, Upload, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { currentUser, updateProfile, switchRole } = useAuth();

  // Local states
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [role, setRole] = useState(currentUser?.role || 'User');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await storageService.uploadImage(file);
        setAvatar(base64);
      } catch (err) {
        alert("Failed to preview image.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await updateProfile({ name, phone, avatar });
      if (role !== currentUser?.role) {
        await switchRole(role);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Error updating profile settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Profile</h1>
        <p className="text-xs text-slate-400">Configure your public stay details, credentials, and tester roles</p>
      </div>

      <motion.form 
        onSubmit={handleFormSubmit}
        className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        
        {success && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-2 text-xs text-emerald-600 animate-in fade-in duration-150">
            <CheckCircle size={16} className="shrink-0" />
            <span>Profile settings saved successfully!</span>
          </div>
        )}

        {/* Profile Avatar section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-100 pb-6">
          <div className="relative w-20 h-20 rounded-full border bg-slate-50 overflow-hidden shrink-0">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <User size={32} />
              </div>
            )}
          </div>
          
          <label className="flex items-center space-x-2 px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-sm">
            <Upload size={14} />
            <span>Upload New Photo</span>
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</label>
            <div className="relative">
              <Phone size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email (Readonly) */}
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address (Primary)</label>
            <div className="relative opacity-60">
              <Mail size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                readOnly
                value={currentUser?.email || ''}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Role Changer */}
          <div className="space-y-1 sm:col-span-2 bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <div className="flex items-center space-x-1.5 text-slate-700 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Shield size={14} className="text-primary-500" />
              <span>Developer Workspace Role Switcher</span>
            </div>
            <p className="text-[10px] text-slate-400 mb-3">
              Switching roles changes listings capabilities (Owner dashboard filters, Admin overview widgets, Tenant reservation screens) immediately.
            </p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full sm:w-48 text-xs font-bold px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none cursor-pointer"
            >
              <option value="User">Tenant (User)</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-colors"
        >
          {saving ? 'Saving changes...' : 'Save Profile Changes'}
        </button>

      </motion.form>

    </div>
  );
}
