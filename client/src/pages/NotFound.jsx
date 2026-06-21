import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <motion.div 
        className="text-center space-y-6 max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <Compass size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-slate-900 font-mono">404</h1>
          <h2 className="text-xl font-extrabold text-slate-800">Stay Not Found</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for doesn't exist or has been relocated by the host. Let's get you back on track!
          </p>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-extrabold shadow-md hover:bg-slate-800 transition-colors"
        >
          <Home size={14} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
