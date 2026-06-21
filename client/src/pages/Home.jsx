import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, ShieldCheck, Heart, Sparkles, Map } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { properties, setSearchParams } = useProperties();

  // Search parameters states
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');

  const featuredStays = properties.filter(p => p.featured).slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ city, area, type, budget });
    navigate(`/listings?city=${city}&area=${area}&type=${type}&budget=${budget}`);
  };

  const handleQuickLocation = (locName) => {
    setSearchParams({ city: locName, area: '', type: '', budget: '' });
    navigate(`/listings?city=${locName}`);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Visual Header & Search Panel */}
      <div className="relative bg-slate-900 py-24 md:py-32 px-4 overflow-hidden rounded-b-[40px] shadow-lg">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-primary-400"
          >
            <Sparkles size={12} />
            <span>Premium rentals made easy</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Find Your Next Perfect <span className="bg-gradient-to-r from-primary-400 to-rose-400 bg-clip-text text-transparent">Stay & PG</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base max-w-xl mx-auto"
          >
            Vetted student hostels, shared co-living PGs, private flat shares, and independent stays with zero brokerages.
          </motion.p>

          {/* Search Box Panel */}
          <motion.form 
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-left"
          >
            {/* City */}
            <div className="space-y-1 p-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">City</span>
              <div className="relative">
                <MapPin size={14} className="absolute left-0.5 top-1 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-bold pl-5 pr-1 py-0.5 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Area */}
            <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Area / Locality</span>
              <div className="relative">
                <MapPin size={14} className="absolute left-0.5 top-1 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. HSR Layout" 
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full text-xs font-bold pl-5 pr-1 py-0.5 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-1 p-2 border-t lg:border-t-0 lg:border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Stay Type</span>
              <div className="relative">
                <Building size={14} className="absolute left-0.5 top-1 text-slate-400" />
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full text-xs font-bold pl-5 pr-1 py-0.5 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-700 cursor-pointer"
                >
                  <option value="">Any Type</option>
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Flat">Flat</option>
                  <option value="Room">Room</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1 p-2 border-t lg:border-t-0 lg:border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Max Budget</span>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="Max Rent" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs font-bold pl-1 pr-1 py-0.5 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              className="lg:col-span-1 py-3 bg-gradient-to-r from-primary-500 to-rose-500 hover:from-primary-600 hover:to-rose-600 rounded-2xl text-white font-extrabold text-xs shadow-md shadow-primary-500/10 flex items-center justify-center space-x-2 transition-all mt-2 lg:mt-0"
            >
              <Search size={14} />
              <span>Search</span>
            </button>
          </motion.form>
        </div>
      </div>

      {/* Popular Cities Carousels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">Explore Stay Locations</h2>
          <p className="text-xs text-slate-400">Discover properties in India's leading metro cities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Bengaluru", count: 2, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80" },
            { name: "New Delhi", count: 2, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80" },
            { name: "Mumbai", count: 1, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80" }
          ].map((loc, idx) => (
            <div 
              key={idx}
              onClick={() => handleQuickLocation(loc.name)}
              className="relative rounded-3xl overflow-hidden aspect-[1.6/1] group cursor-pointer border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 smooth-transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-white font-extrabold text-base">{loc.name}</h3>
                <span className="text-[10px] text-slate-200 font-semibold">{loc.count} stays & PGs listed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">Top-Rated Stays</h2>
            <p className="text-xs text-slate-400">Handpicked premium properties with exceptional guest ratings</p>
          </div>
          <button 
            onClick={() => navigate('/listings')} 
            className="text-xs font-bold text-primary-500 hover:underline"
          >
            See all stays &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStays.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Premium Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 rounded-[32px] py-12 px-8 text-white grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex space-x-4 items-start">
          <div className="p-3 bg-white/10 rounded-2xl text-primary-400 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm">100% Vetted Stays</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every PG, hostel, and flat listing undergoes standard security inspections and quality checklist assessments.
            </p>
          </div>
        </div>

        <div className="flex space-x-4 items-start">
          <div className="p-3 bg-white/10 rounded-2xl text-primary-400 shrink-0">
            <Building size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm">No Middlemen Brokerage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect directly with verified owners on phone or WhatsApp. Rent transparently without paying extra commission.
            </p>
          </div>
        </div>

        <div className="flex space-x-4 items-start">
          <div className="p-3 bg-white/10 rounded-2xl text-primary-400 shrink-0">
            <Heart size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm">Flexible Occupancies</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose single rooms, double occupancy sharing plans, or whole apartments depending on your pricing preferences.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
