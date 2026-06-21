import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react';

export default function MapPlaceholder({ properties = [] }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // Distribute properties into deterministic coords in a bounding box 0-100%
  const getCoordinates = (pId, idx) => {
    // Return standard coordinates matching mock listings to place them neatly on our SVG canvas
    const points = [
      { x: 30, y: 40 },
      { x: 65, y: 35 },
      { x: 45, y: 70 },
      { x: 20, y: 65 },
      { x: 75, y: 60 }
    ];
    return points[idx % points.length];
  };

  return (
    <div className="relative bg-slate-100 rounded-3xl overflow-hidden h-[400px] border border-slate-200 select-none shadow-inner">
      
      {/* Grid Overlay background */}
      <div 
        className="absolute inset-0 bg-slate-100 transition-transform duration-300"
        style={{ 
          transform: `scale(${zoomLevel})`,
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Draw vector streets/rivers for premium mock layout details */}
        <svg className="absolute inset-0 w-full h-full text-slate-200 opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main River */}
          <path d="M-10,180 C150,190 300,100 450,220 C600,340 750,280 900,290" fill="none" stroke="#bae6fd" strokeWidth="24" />
          {/* Main Road Highway */}
          <line x1="0" y1="120" x2="800" y2="350" stroke="#f8fafc" strokeWidth="8" />
          <line x1="0" y1="120" x2="800" y2="350" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,4" />
          {/* Side Road */}
          <line x1="250" y1="0" x2="350" y2="400" stroke="#f8fafc" strokeWidth="6" />
        </svg>

        {/* Custom Map pins */}
        {properties.map((property, idx) => {
          const coords = getCoordinates(property.id, idx);
          const isHovered = hoveredProperty?.id === property.id;
          return (
            <div
              key={property.id}
              className="absolute transition-all cursor-pointer z-10"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              onMouseEnter={() => setHoveredProperty(property)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              {/* Pin indicator */}
              <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <div className={`px-2 py-1 rounded-full text-[10px] font-extrabold shadow-md border smooth-transition ${
                  isHovered 
                    ? 'bg-primary-500 border-primary-600 text-white scale-110 z-20' 
                    : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  ₹{Math.round(property.price/1000)}k
                </div>
                <div className={`w-2 h-2 rounded-full border shadow-sm -mt-0.5 smooth-transition ${
                  isHovered ? 'bg-primary-500 border-white scale-125' : 'bg-slate-700 border-white'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover stay details preview tooltip */}
      {hoveredProperty && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-64 bg-white rounded-2xl p-3 border border-slate-100 shadow-xl flex space-x-3 z-30 animate-in slide-in-from-bottom-2 duration-150">
          <img 
            src={hoveredProperty.images[0]} 
            alt="Preview" 
            className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0" 
          />
          <div className="space-y-1 min-w-0">
            <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-[8px] font-bold text-slate-500 rounded uppercase">
              {hoveredProperty.type}
            </span>
            <h4 className="text-xs font-bold text-slate-800 truncate">{hoveredProperty.title}</h4>
            <p className="text-[10px] font-extrabold text-primary-500">₹{hoveredProperty.price.toLocaleString('en-IN')}/mo</p>
          </div>
        </div>
      )}

      {/* Compass header */}
      <div className="absolute top-4 left-4 p-2 bg-white/95 border border-slate-100 shadow-md rounded-xl text-slate-600 flex items-center space-x-1 text-[10px] font-extrabold">
        <Compass size={14} className="text-primary-500" />
        <span>Mock Area Grid Map</span>
      </div>

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-1.5">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
          className="p-2 bg-white border border-slate-100 shadow-md rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ZoomIn size={14} />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
          className="p-2 bg-white border border-slate-100 shadow-md rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ZoomOut size={14} />
        </button>
      </div>

      {/* Footer warning */}
      <div className="absolute bottom-4 right-4 px-2 py-1 bg-slate-900/60 backdrop-blur-sm rounded-lg text-[8px] font-bold text-white/80">
        Google Maps Configurable Fallback
      </div>

    </div>
  );
}
