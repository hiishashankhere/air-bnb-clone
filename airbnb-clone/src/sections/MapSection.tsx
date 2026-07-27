import { ChevronRight, MapPin, Minus, Plus, Search } from 'lucide-react';
import { memo, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';

interface MapSectionProps {
  location: string;
  highlights: string;
}

export const MapSection = memo(function MapSection({ location, highlights }: MapSectionProps) {
  const [, setZoom] = useState(14);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SectionContainer>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Where you'll be</h2>
      <p className="text-sm text-gray-600 mb-6">{location}</p>

      {/* Interactive Map Visual Mock */}
      <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-200 bg-emerald-50 shadow-airbnb-card flex items-center justify-center">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Mock Roads / Terrain SVG */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-300 fill-none stroke-[2]" opacity="0.6">
          <path d="M0 100 Q 300 150 600 80 T 1200 200" />
          <path d="M200 0 Q 250 200 400 400" />
          <path d="M800 0 Q 750 300 900 400" />
        </svg>

        {/* Center Pin Badge */}
        <div className="relative z-10 flex flex-col items-center animate-bounce">
          <div className="p-3 bg-[#FF385C] text-white rounded-full shadow-lg border-2 border-white">
            <MapPin className="w-6 h-6 fill-current" />
          </div>
          <div className="mt-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-md border border-gray-200">
            Amor de Goa
          </div>
        </div>

        {/* Map Top-Left Search Control */}
        <div className="absolute top-4 left-4 z-10">
          <button
            aria-label="Search map"
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-200 transition focus:outline-none focus:ring-2 focus:ring-black"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Map Right Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => setZoom((z) => Math.min(z + 1, 18))}
            aria-label="Zoom in"
            className="p-2.5 hover:bg-gray-100 text-gray-700 border-b border-gray-200 transition focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 1, 10))}
            aria-label="Zoom out"
            className="p-2.5 hover:bg-gray-100 text-gray-700 transition focus:outline-none"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">Exact location will be provided after booking.</p>

      {/* Neighbourhood Highlights */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 text-base mb-2">Neighbourhood highlights</h3>
        <p className={`text-sm text-gray-700 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {highlights}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 font-semibold text-gray-900 underline text-sm hover:text-gray-700 focus:outline-none"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </SectionContainer>
  );
});

