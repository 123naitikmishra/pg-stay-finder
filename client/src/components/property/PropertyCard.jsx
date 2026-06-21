import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyCard({ property }) {
  const { toggleFavorite } = useProperties();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const isFavorite = currentUser?.favorites?.includes(property.id) || false;

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    await toggleFavorite(property.id);
  };

  return (
    <motion.div 
      onClick={() => navigate(`/property/${property.id}`)}
      className="group relative cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-hover-card smooth-transition"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Gallery area */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[currentImageIdx]} 
            alt={property.title} 
            className="h-full w-full object-cover group-hover:scale-105 smooth-transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No Image
          </div>
        )}

        {/* Carousel arrows */}
        {property.images && property.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 smooth-transition">
            <button 
              onClick={handlePrevImage} 
              className="p-1 rounded-full bg-white/95 text-slate-700 hover:scale-105 hover:bg-white shadow-md transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextImage} 
              className="p-1 rounded-full bg-white/95 text-slate-700 hover:scale-105 hover:bg-white shadow-md transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Dot Indicators */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          <span className="px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur-sm text-slate-800 rounded-full shadow-sm uppercase tracking-wide">
            {property.type}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-[10px] font-bold bg-indigo-600 text-white rounded-full shadow-sm uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>

        {/* Heart Favorite button */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:scale-110 smooth-transition text-slate-600"
        >
          <Heart 
            size={16} 
            className={`transition-colors ${isFavorite ? 'fill-primary-500 text-primary-500' : 'text-slate-600'}`} 
          />
        </button>
      </div>

      {/* Details Card */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and type */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold capitalize text-slate-400">
              {property.area}, {property.city}
            </span>
            <div className="flex items-center space-x-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-slate-700">{property.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mb-1.5 group-hover:text-primary-500 transition-colors">
            {property.title}
          </h3>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[9px] px-1.5 py-0.5 text-slate-400 font-medium">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-sm font-extrabold text-slate-900">₹{property.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-400 font-semibold">/month</span>
          </div>
          <span className="text-[10px] text-primary-500 font-extrabold group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
