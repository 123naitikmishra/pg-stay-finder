import { Sparkles, MapPin, Building, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 rounded-full text-xs font-bold text-primary-500">
          <Sparkles size={12} />
          <span>Who We Are</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Simplifying Student & Co-living Rentals
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          StayFinder is a modern premium rental platform designed to connect young professionals, tenants, and college students directly to vetted PG rooms, flats, and co-living hosts.
        </p>
      </div>

      {/* Grid Props */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shrink-0">
            <Building size={20} />
          </div>
          <h3 className="font-extrabold text-slate-800 text-sm">Direct Owner Bookings</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminate traditional broker percentages. We facilitate direct WhatsApp and cell phone connection interfaces enabling direct lease structures.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-3 shadow-sm">
          <div className="w-10 h-10 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-extrabold text-slate-800 text-sm">Verified Stays Only</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We ensure all listed houses, host hostels, and room shares undergo physical checks regarding water supply, cleaning setups, and fire exits.
          </p>
        </div>
      </div>

      {/* Team mission section */}
      <div className="bg-slate-900 rounded-[32px] p-8 text-center text-white relative overflow-hidden shadow-lg space-y-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-lg font-extrabold relative z-10">Our Strategic Vision</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed relative z-10">
          We believe renting shared rooms should not feel complex. By digitizing filters, occupancy details, and hosting tools, StayFinder helps users locate reliable stays in minutes.
        </p>
      </div>

    </div>
  );
}
