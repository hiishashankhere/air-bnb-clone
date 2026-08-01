import { ChevronRight, MapPin, Minus, Plus, Search } from 'lucide-react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';

interface MapSectionProps {
  location: string;
  highlights: string;
}

interface Landmark {
  id: string;
  name: string;
  x: number;
  y: number;
  tone: string;
}

export const MapSection = memo(function MapSection({ location, highlights }: MapSectionProps) {
  const [zoom, setZoom] = useState(14);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMapHint, setShowMapHint] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<string>('home');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null
  );
  const mapViewportRef = useRef<HTMLDivElement | null>(null);

  const zoomScale = 0.95 + (zoom - 10) * 0.075;
  const landmarks: Landmark[] = useMemo(
    () => [
      { id: 'home', name: 'Amor de Goa', x: 52, y: 52, tone: 'bg-[#FF385C]' },
      { id: 'beach', name: 'Candolim Beach', x: 72, y: 34, tone: 'bg-amber-500' },
      { id: 'cafes', name: 'Cafes', x: 40, y: 66, tone: 'bg-sky-600' },
      { id: 'nightlife', name: 'Nightlife', x: 22, y: 58, tone: 'bg-violet-600' },
      { id: 'market', name: 'Local Market', x: 62, y: 76, tone: 'bg-emerald-600' },
    ],
    []
  );

  const selectedLandmark = landmarks.find((landmark) => landmark.id === activeLandmark) ?? landmarks[0];

  const resetMap = () => {
    setZoom(14);
    setOffset({ x: 0, y: 0 });
    setActiveLandmark('home');
    setShowMapHint(true);
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || !dragState.current) return;
      const dx = event.clientX - dragState.current.startX;
      const dy = event.clientY - dragState.current.startY;
      setOffset({
        x: dragState.current.originX + dx,
        y: dragState.current.originY + dy,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragState.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <SectionContainer>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Where you'll be</h2>
      <p className="text-sm text-gray-600 mb-6">{location}</p>

      <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-200 bg-emerald-50 shadow-airbnb-card">
        <div
          ref={mapViewportRef}
          className={`absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            const target = event.target as HTMLElement;
            if (target.closest('[data-map-pin="true"]')) return;

            dragState.current = {
              startX: event.clientX,
              startY: event.clientY,
              originX: offset.x,
              originY: offset.y,
            };
            setIsDragging(true);
          }}
          onDoubleClick={() => {
            setZoom((value) => Math.min(value + 1, 18));
          }}
        >
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_18%_78%,rgba(6,182,212,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.08),transparent_25%)]" />

          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${zoomScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative h-[640px] w-[1080px]">
              <svg
                className="absolute inset-0 h-full w-full stroke-emerald-300 fill-none stroke-[2]"
                opacity="0.72"
                viewBox="0 0 1080 640"
                aria-hidden="true"
              >
                <path d="M-20 120 Q 210 180 390 110 T 760 150 T 1120 90" />
                <path d="M120 20 Q 210 260 340 420 T 560 620" />
                <path d="M760 -20 Q 710 210 760 390 T 940 700" />
                <path d="M40 540 Q 260 430 460 500 T 970 520" />
                <path d="M300 80 Q 470 220 510 360 T 640 560" />
              </svg>

              <div className="absolute inset-0">
                {landmarks.map((landmark) => {
                  const isActive = activeLandmark === landmark.id;
                  return (
                    <button
                      key={landmark.id}
                      type="button"
                      data-map-pin="true"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveLandmark(landmark.id);
                        if (landmark.id !== 'home') {
                          setShowMapHint(true);
                        }
                      }}
                      className="absolute -translate-x-1/2 -translate-y-full rounded-full focus:outline-none"
                      style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                      aria-label={landmark.name}
                    >
                      <span
                        className={`relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg border-2 border-white ${landmark.tone} ${
                          isActive ? 'ring-4 ring-white/70' : ''
                        }`}
                      >
                        <MapPin className="h-6 w-6 fill-current" />
                        <span className="absolute -inset-2 rounded-full border border-white/80 animate-pulse" />
                      </span>
                      <span
                        className={`mt-2 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900 shadow-md border border-gray-200 transition ${
                          isActive ? 'scale-105' : ''
                        }`}
                      >
                        {landmark.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <button
            type="button"
            aria-label="Search map"
            onClick={() => {
              resetMap();
              setActiveLandmark('beach');
            }}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 border border-gray-200 transition focus:outline-none focus:ring-2 focus:ring-black"
          >
            <Search className="w-4 h-4" />
          </button>

          <div className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-md border border-gray-200">
            Zoom {zoom}
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(value + 1, 18))}
            aria-label="Zoom in"
            className="border-b border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(value - 1, 10))}
            aria-label="Zoom out"
            className="p-2.5 text-gray-700 transition hover:bg-gray-100 focus:outline-none"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-10 max-w-xs rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-900">Selected place</p>
          <p className="text-sm font-medium text-gray-700 mt-1">{selectedLandmark.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            Drag to pan, use the buttons to zoom, or click a pin to change the focused area.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">Exact location will be provided after booking.</p>
      {showMapHint && (
        <p className="text-xs text-gray-600 mt-2">
          This is an interactive preview map. The map now pans, zooms, and changes focus when you click
          landmarks.
        </p>
      )}

      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 text-base mb-2">Neighbourhood highlights</h3>
        <p className={`text-sm text-gray-700 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {highlights}
        </p>
        <button
          type="button"
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
