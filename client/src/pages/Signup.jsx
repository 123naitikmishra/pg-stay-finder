import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // User or Owner
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await register(email, password, name, role);
      // Route based on role
      if (role === 'Owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      
      <motion.div 
        className="bg-white rounded-[32px] border border-slate-100 shadow-xl max-w-md w-full overflow-hidden flex flex-col p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 rounded-full text-[10px] font-extrabold text-primary-600 uppercase">
            <Sparkles size={10} />
            <span>Create Account</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Join StayFinder</h1>
          <p className="text-xs text-slate-400">Discover premium co-living rentals easily</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-2 text-xs text-red-600 animate-in fade-in duration-150">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Role selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">I want to register as a:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('User')}
                className={`py-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  role === 'User'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Tenant (Looking for stays)
              </button>
              <button
                type="button"
                onClick={() => setRole('Owner')}
                className={`py-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  role === 'Owner'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Owner (List properties)
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-rose-600 hover:from-primary-600 hover:to-rose-700 text-white rounded-xl text-xs font-extrabold shadow-md transition-colors"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary-500 font-bold hover:underline">Log in</Link>
        </div>

      </motion.div>

    </div>
  );
}
