import { useState } from 'react';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export default function PropertyFilters() {
  const { activeFilters, setActiveFilters } = useProperties();
  const [modalOpen, setModalOpen] = useState(false);

  // Local state for modal before committing
  const [localFilters, setLocalFilters] = useState({ ...activeFilters });

  const categories = [
    { label: 'All Stays', value: '' },
    { label: 'PG / Co-living', value: 'PG' },
    { label: 'Hostel', value: 'Hostel' },
    { label: 'Independent Flat', value: 'Flat' },
    { label: 'Private Room', value: 'Room' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'House', value: 'House' }
  ];

  const amenitiesList = [
    "Wi-Fi", "AC", "Meals", "Gym", "Laundry", "Power Backup", "CCTV", "Parking"
  ];

  const handleCategorySelect = (val) => {
    setActiveFilters((prev) => ({ ...prev, type: val }));
  };

  const handleAmenityToggle = (amenity) => {
    setLocalFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const applyFilters = () => {
    setActiveFilters(localFilters);
    setModalOpen(false);
  };

  const resetFilters = () => {
    const fresh = {
      budget: 50000,
      rating: 0,
      amenities: [],
      availability: false,
      type: '',
    };
    setLocalFilters(fresh);
    setActiveFilters(fresh);
    setModalOpen(false);
  };

  return (
    <div className="bg-white py-4 border-b border-slate-100 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Horizontal Categories */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pr-4 -mr-4 md:mr-0 md:pr-0">
          {categories.map((cat, idx) => {
            const isActive = activeFilters.type === cat.value;
            return (
              <button
                key={idx}
                onClick={() => handleCategorySelect(cat.value)}
                className={`px-4 py-2 text-xs font-bold rounded-full border whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Trigger button */}
        <button 
          onClick={() => {
            setLocalFilters({ ...activeFilters });
            setModalOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white shadow-sm hover:shadow-md smooth-transition ml-4"
        >
          <SlidersHorizontal size={14} />
          <span>Filters</span>
        </button>

      </div>

      {/* Filter Overlay Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/55">
              <h3 className="font-extrabold text-slate-800 text-lg">Filters</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Budget slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-slate-800 text-sm">Monthly Budget Limit</h4>
                  <span className="text-xs font-extrabold text-primary-500">₹{localFilters.budget.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="50000" 
                  step="500"
                  value={localFilters.budget}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                  className="w-full accent-primary-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>₹2,000</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Rating filter */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">Minimum Rating</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 3, 4, 4.5, 4.8].map((ratingVal) => {
                    const isActive = localFilters.rating === ratingVal;
                    return (
                      <button
                        key={ratingVal}
                        onClick={() => setLocalFilters(prev => ({ ...prev, rating: ratingVal }))}
                        className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                          isActive 
                            ? 'bg-primary-50 border-primary-300 text-primary-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {ratingVal === 0 ? 'Any' : `${ratingVal}★+`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities grid */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3">Amenities</h4>
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => {
                    const isChecked = localFilters.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                          isChecked 
                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{amenity}</span>
                        {isChecked && <Check size={14} className="text-primary-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability check */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Instant Booking Availability</h4>
                  <p className="text-[10px] text-slate-400">Show only stays accepting bookings right now</p>
                </div>
                <input 
                  type="checkbox"
                  checked={localFilters.availability}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, availability: e.target.checked }))}
                  className="w-4 h-4 accent-primary-500 rounded cursor-pointer"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button 
                onClick={resetFilters}
                className="flex items-center space-x-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:underline"
              >
                <RefreshCw size={12} />
                <span>Clear All</span>
              </button>
              <button 
                onClick={applyFilters}
                className="px-6 py-2 bg-primary-500 text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-primary-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
