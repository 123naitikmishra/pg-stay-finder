import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const user = await login(email, password);
      // Route based on role
      if (user.role === 'Owner') {
        navigate('/owner-dashboard');
      } else if (user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/user-dashboard');
    } catch (err) {
      setErrorMsg('Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demopass123');
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
            <span>Secure Log In</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Google sign-in */}
        <div className="relative flex py-2 items-center text-xs text-slate-400 justify-center">
          <span className="absolute bg-white px-3 font-semibold">Or log in with</span>
          <div className="w-full border-t border-slate-100"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors bg-white shadow-sm"
        >
          {/* Custom colorful Google 'G' icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Demo profiles help card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-[10px]">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">Demo Accounts (Any password works):</span>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => handleQuickFill('user@example.com')} className="px-2 py-1 bg-white border border-slate-200 hover:border-primary-400 rounded-lg text-slate-600 font-semibold transition-all">
              User Profile
            </button>
            <button type="button" onClick={() => handleQuickFill('owner@example.com')} className="px-2 py-1 bg-white border border-slate-200 hover:border-primary-400 rounded-lg text-slate-600 font-semibold transition-all">
              Owner Profile
            </button>
            <button type="button" onClick={() => handleQuickFill('admin@example.com')} className="px-2 py-1 bg-white border border-slate-200 hover:border-primary-400 rounded-lg text-slate-600 font-semibold transition-all">
              Admin Profile
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-primary-500 font-bold hover:underline">Sign up</Link>
        </div>

      </motion.div>

    </div>
  );
}
