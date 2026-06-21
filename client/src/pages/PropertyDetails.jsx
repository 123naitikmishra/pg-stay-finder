import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import PropertyGallery from '../components/property/PropertyGallery';
import BookingWidget from '../components/property/BookingWidget';
import MapPlaceholder from '../components/property/MapPlaceholder';
import { 
  Phone, MessagesSquare, Check, Star, ShieldCheck, Heart, User, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { properties, toggleFavorite, submitReview, removeReview } = useProperties();
  const [property, setProperty] = useState(null);

  // Review states
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const found = properties.find(p => p.id === id);
    if (found) {
      setProperty(found);
    }
  }, [id, properties]);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-slate-500 font-semibold">Loading property details...</p>
        <Link to="/listings" className="text-xs text-primary-500 font-extrabold hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  const isFavorite = currentUser?.favorites?.includes(property.id) || false;

  const handleFavoriteClick = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    await toggleFavorite(property.id);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setReviewSubmitting(true);
    try {
      await submitReview(property.id, revRating, revComment);
      setRevComment('');
      setRevRating(5);
    } catch (err) {
      alert("Error adding review.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded-full uppercase tracking-wide">
              {property.type}
            </span>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide ${
              property.gender === 'male' 
                ? 'bg-blue-50 text-blue-600' 
                : property.gender === 'female' 
                  ? 'bg-pink-50 text-pink-600' 
                  : 'bg-emerald-50 text-emerald-600'
            }`}>
              {property.gender === 'male' ? 'Men Only' : property.gender === 'female' ? 'Women Only' : 'Unisex Stay'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{property.title}</h1>
          <p className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
            <span>{property.address}</span>
          </p>
        </div>

        {/* Favorite Action Button */}
        <button 
          onClick={handleFavoriteClick}
          className="flex items-center space-x-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 smooth-transition bg-white shadow-sm"
        >
          <Heart size={14} className={isFavorite ? 'fill-primary-500 text-primary-500' : 'text-slate-600'} />
          <span>{isFavorite ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Property Photo Grid Gallery */}
      <PropertyGallery images={property.images} />

      {/* Split layout: Details & Booking Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Stay Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Host info segment */}
          <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={property.host.avatar} alt="Host" className="w-12 h-12 rounded-full object-cover bg-slate-50 border" />
              <div>
                <p className="text-xs text-slate-400 font-semibold">Hosted by</p>
                <h3 className="font-extrabold text-slate-800 text-sm">{property.host.name}</h3>
              </div>
            </div>
            
            {/* Quick Contact options */}
            <div className="flex space-x-2">
              <a 
                href={`tel:${property.host.phone}`}
                className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                title="Call Host"
              >
                <Phone size={16} />
              </a>
              <a 
                href={`https://wa.me/${property.host.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                title="WhatsApp Chat"
              >
                <MessagesSquare size={16} />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-800">About this stay</h2>
            <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">What this place offers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-3 p-3 bg-white border border-slate-50 rounded-2xl">
                  <div className="w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 shrink-0">
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Occupancy rules info */}
          <div className="p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 space-y-3">
            <h3 className="font-extrabold text-indigo-900 text-sm flex items-center space-x-2">
              <Sparkles size={16} className="text-indigo-500" />
              <span>Rental occupancy guidelines</span>
            </h3>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Rent details differ per sharing status chosen. All stays include basic breakfast/dinner meal structures (where applicable), high speed internet lines, and cleaning schedules managed daily by PG helpers.
            </p>
          </div>

          {/* Maps placeholder visual */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Location Area Map</h2>
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <MapPlaceholder properties={[property]} />
            </div>
          </div>

          {/* Reviews section */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-800">Reviews & Feedback</h2>
              <div className="flex items-center space-x-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-extrabold text-slate-800 text-sm">{property.rating}</span>
                <span className="text-xs text-slate-400 font-semibold">({property.reviews.length} reviews)</span>
              </div>
            </div>

            {/* Submit review form */}
            {currentUser ? (
              <form onSubmit={handleReviewSubmit} className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-500">Your Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setRevRating(val)}
                        className="text-yellow-400"
                      >
                        <Star size={16} className={val <= revRating ? 'fill-yellow-400' : 'text-slate-300'} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  placeholder="Share details of your experience here..."
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none h-24 resize-none"
                />
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-extrabold shadow hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {reviewSubmitting ? 'Posting...' : 'Post Review'}
                </button>
              </form>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl">
                Please <Link to="/login" className="text-primary-500 font-bold hover:underline">log in</Link> to post reviews.
              </p>
            )}

            {/* Reviews display list */}
            {property.reviews.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No reviews yet. Be the first to add one!</p>
            ) : (
              <div className="space-y-4">
                {property.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start justify-between">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img src={rev.userAvatar} alt="user" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-extrabold text-slate-700">{rev.userName}</h4>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex space-x-0.5 text-yellow-400 mb-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} size={10} className={idx < rev.rating ? 'fill-yellow-400' : 'text-slate-200'} />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    </div>

                    {/* Developer/Admin review deleting ability */}
                    {(currentUser?.role === 'Admin' || currentUser?.name === rev.userName) && (
                      <button 
                        onClick={() => removeReview(property.id, rev.id)}
                        className="text-[10px] text-red-500 hover:underline font-bold"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Sticky Booking Reservation Widget */}
        <div className="lg:col-span-1">
          <BookingWidget property={property} />
        </div>

      </div>

    </div>
  );
}
