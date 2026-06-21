import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { Search, MapPin, Grid, AlertCircle } from 'lucide-react';

export default function SearchResults() {
  const { filteredProperties, setSearchParams, loading } = useProperties();
  const [searchParamsUrl] = useSearchParams();

  const city = searchParamsUrl.get('city') || '';
  const area = searchParamsUrl.get('area') || '';
  const type = searchParamsUrl.get('type') || '';
  const budget = searchParamsUrl.get('budget') || '';

  useEffect(() => {
    setSearchParams({ city, area, type, budget });
  }, [city, area, type, budget]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Info */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2 text-primary-400 font-extrabold text-xs uppercase tracking-wider">
            <Search size={14} />
            <span>Search Filter Panel</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold">
            Search Matches in {city || 'All Cities'}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {area && <span className="px-2.5 py-1 bg-white/10 rounded-lg">Area: {area}</span>}
            {type && <span className="px-2.5 py-1 bg-white/10 rounded-lg">Type: {type}</span>}
            {budget && <span className="px-2.5 py-1 bg-white/10 rounded-lg">Budget Limit: ₹{budget}</span>}
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filteredProperties.length} results matching criteria
          </span>
          <Link to="/listings" className="text-xs font-extrabold text-primary-500 hover:underline">
            View Map Layout
          </Link>
        </div>

        {loading ? (
          <p className="text-xs text-slate-400 py-12 text-center">Searching...</p>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-100 rounded-3xl space-y-4">
            <AlertCircle size={32} className="text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-500">No direct stays match your specific criteria.</p>
            <Link to="/listings" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
              Explore All Stays
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
