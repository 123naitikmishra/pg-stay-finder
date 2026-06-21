import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { bookingService } from '../services/bookingService';
import PropertyCard from '../components/property/PropertyCard';
import { Calendar, MapPin, Sparkles, Clock, CreditCard, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const { getFavorites } = useProperties();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await bookingService.getBookings(currentUser.id, currentUser.role);
      setBookings(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const favoriteStays = getFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-1 text-primary-400 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Tenant Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold">Welcome back, {currentUser?.name}!</h1>
          <p className="text-xs text-slate-400">Manage your active reservations, rent schedules, and bookmarks</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-100 flex space-x-6 text-sm font-bold text-slate-400">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'bookings' 
              ? 'border-primary-500 text-slate-800' 
              : 'border-transparent hover:text-slate-600'
          }`}
        >
          My Stays ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'favorites' 
              ? 'border-primary-500 text-slate-800' 
              : 'border-transparent hover:text-slate-600'
          }`}
        >
          My Wishlist ({favoriteStays.length})
        </button>
      </div>

      {/* Bookings View */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {loadingBookings ? (
            <p className="text-xs text-slate-400 py-12 text-center">Loading reservations...</p>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-4">
              <p className="text-sm font-semibold text-slate-500">You don't have any bookings yet.</p>
              <Link to="/listings" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
                Explore Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md smooth-transition">
                  <img src={booking.propertyImage} alt="Stay" className="w-full md:w-32 h-32 rounded-2xl object-cover bg-slate-50 shrink-0" />
                  
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wide ${
                          booking.status === 'Confirmed' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold font-mono">Ref: {booking.id}</span>
                      </div>
                      <Link to={`/property/${booking.propertyId}`} className="font-extrabold text-slate-800 text-sm hover:underline hover:text-primary-500 block">
                        {booking.propertyName}
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-100/50 font-semibold text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={12} className="text-slate-400" />
                        <span>Checkin: {booking.startDate}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>Duration: {booking.durationMonths} Months</span>
                      </div>
                      <div className="flex items-center space-x-1.5 col-span-2">
                        <CreditCard size={12} className="text-slate-400" />
                        <span>₹{booking.monthlyRent}/mo • Paid ₹{booking.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Favorites View */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favoriteStays.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl space-y-4">
              <Heart size={28} className="text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-500">Your wishlist is empty.</p>
              <Link to="/listings" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
                Find Stays to Save
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
      )}

    </div>
  );
}
