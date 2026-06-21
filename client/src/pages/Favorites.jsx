import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/property/PropertyCard';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { currentUser } = useAuth();
  const { getFavorites } = useProperties();

  const favoriteStays = getFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Info */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-1 text-primary-400 font-extrabold text-xs uppercase tracking-wider">
            <Heart size={14} />
            <span>Saved Wishlist</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold">My Saved Properties</h1>
          <p className="text-xs text-slate-400">Keep track of PGs and hostels you're interested in</p>
        </div>
      </div>

      {favoriteStays.length === 0 ? (
        <div className="text-center py-24 bg-white border border-slate-100 rounded-3xl space-y-4">
          <Heart size={32} className="text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Your wishlist is currently empty.</p>
          <Link to="/listings" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
            Explore Stays
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteStays.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
}
