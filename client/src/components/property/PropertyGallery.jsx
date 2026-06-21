import { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ images }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const showViewer = (idx) => {
    setActiveIdx(idx);
    setViewerOpen(true);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      
      {/* Airbnb-style grid (1 large + up to 4 small) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden aspect-[2/1] md:aspect-[2.4/1]">
        
        {/* Main large image */}
        <div className="md:col-span-2 relative cursor-pointer overflow-hidden bg-slate-100 group" onClick={() => showViewer(0)}>
          <img 
            src={images[0]} 
            alt="Main stay view" 
            className="w-full h-full object-cover group-hover:scale-[1.02] smooth-transition"
          />
        </div>

        {/* Right smaller images */}
        <div className="hidden md:grid md:grid-cols-2 md:col-span-2 gap-3">
          {[1, 2, 3, 4].map((idx) => {
            const hasImage = !!images[idx];
            return (
              <div 
                key={idx} 
                className={`relative overflow-hidden bg-slate-100 group ${hasImage ? 'cursor-pointer' : ''}`}
                onClick={() => hasImage && showViewer(idx)}
              >
                {hasImage ? (
                  <img 
                    src={images[idx]} 
                    alt={`Stay view ${idx}`} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] smooth-transition"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Image size={24} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Show all photos trigger button */}
      <button 
        onClick={() => showViewer(0)}
        className="absolute bottom-4 right-4 flex items-center space-x-2 px-4 py-2 bg-white/95 text-xs font-bold text-slate-700 rounded-xl shadow-md border border-slate-200 hover:bg-white smooth-transition"
      >
        <Image size={14} />
        <span>Show all photos</span>
      </button>

      {/* Full screen photo viewer overlay */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-slate-950 z-[999] flex items-center justify-center p-4 select-none">
          <button 
            onClick={() => setViewerOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Carousel image */}
          <div className="relative max-w-4xl w-full aspect-[4/3] md:aspect-[3/2] flex items-center justify-center">
            <img 
              src={images[activeIdx]} 
              alt={`View ${activeIdx + 1}`} 
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev} 
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext} 
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Photo count indicator */}
          <div className="absolute bottom-6 text-xs text-white/60 font-semibold">
            {activeIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
