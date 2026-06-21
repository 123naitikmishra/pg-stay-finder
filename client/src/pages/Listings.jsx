import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyCard from '../components/property/PropertyCard';
import MapPlaceholder from '../components/property/MapPlaceholder';
import { Map, Grid, RefreshCw } from 'lucide-react';

export default function Listings() {
  const { filteredProperties, loading, setSearchParams, activeFilters, setActiveFilters } = useProperties();
  const [searchParamsUrl] = useSearchParams();
  const [showMapOnMobile, setShowMapOnMobile] = useState(false);

  // Sync URL search parameters on mount
  useEffect(() => {
    const city = searchParamsUrl.get('city') || '';
    const area = searchParamsUrl.get('area') || '';
    const type = searchParamsUrl.get('type') || '';
    const budget = searchParamsUrl.get('budget') || '';

    setSearchParams({ city, area, type, budget });
  }, [searchParamsUrl]);

  const handleResetSearch = () => {
    setActiveFilters({
      budget: 50000,
      rating: 0,
      amenities: [],
      availability: false,
      type: '',
    });
    setSearchParams({ city: '', area: '', type: '', budget: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Property Filters bar */}
      <PropertyFilters />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6 relative">
        
        {/* Left Side: Stays List grid */}
        <div className={`flex-1 space-y-6 ${showMapOnMobile ? 'hidden md:block' : 'block'}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-extrabold text-slate-800">
                {filteredProperties.length === 0 
                  ? 'No stays found' 
                  : `${filteredProperties.length} ${filteredProperties.length === 1 ? 'stay' : 'stays'} available`}
              </h1>
              <p className="text-xs text-slate-400">Showing verified student housing and workspaces</p>
            </div>
            
            {/* Mobile Map / List toggle */}
            <button
              onClick={() => setShowMapOnMobile(!showMapOnMobile)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              {showMapOnMobile ? (
                <>
                  <Grid size={14} />
                  <span>Show List</span>
                </>
              ) : (
                <>
                  <Map size={14} />
                  <span>Show Map</span>
                </>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <RefreshCw size={24} className="text-primary-500 animate-spin" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl space-y-4">
              <p className="text-sm font-semibold text-slate-500">We couldn't find matching stays.</p>
              <button 
                onClick={handleResetSearch}
                className="px-6 py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Maps split view */}
        <div className={`w-full md:w-[420px] lg:w-[480px] shrink-0 sticky top-[152px] h-[calc(100vh-190px)] ${
          showMapOnMobile ? 'block' : 'hidden md:block'
        }`}>
          <div className="h-full rounded-3xl overflow-hidden shadow-md">
            <MapPlaceholder properties={filteredProperties} />
          </div>
        </div>

      </div>

    </div>
  );
}
