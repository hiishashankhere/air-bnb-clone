import { Grid } from 'lucide-react';
import type { Photo } from '../types/listing';

interface HeroGalleryProps {
  photos: Photo[];
  onOpenPhotoTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export function HeroGallery({ photos, onOpenPhotoTour, onOpenLightbox }: HeroGalleryProps) {
  const displayPhotos = photos.slice(0, 5);

  return (
    <div className="relative my-6 group/gallery">
      {/* 5-Photo Grid with precise individual corner radii */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden rounded-2xl">
        {/* Main Large Featured Photo (Left 2 columns) */}
        {displayPhotos[0] && (
          <div
            onClick={() => onOpenLightbox(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(0);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View full photo 1: ${displayPhotos[0].caption}`}
            className="md:col-span-2 relative h-full overflow-hidden cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <img
              src={displayPhotos[0].url}
              alt={displayPhotos[0].caption}
              className="w-full h-full object-cover transition-all duration-300 group-hover/gallery:brightness-[0.92] hover:!brightness-100 hover:scale-[1.01]"
            />
          </div>
        )}

        {/* Right 2x2 Sub-grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {displayPhotos.slice(1, 5).map((photo, idx) => {
            const actualIndex = idx + 1;
            return (
              <div
                key={photo.id}
                onClick={() => onOpenLightbox(actualIndex)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenLightbox(actualIndex);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View full photo ${actualIndex + 1}: ${photo.caption}`}
                className="relative h-full overflow-hidden cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-all duration-300 group-hover/gallery:brightness-[0.92] hover:!brightness-100 hover:scale-[1.01]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Show all photos Floating Button */}
      <button
        onClick={onOpenPhotoTour}
        className="absolute bottom-5 right-5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-900 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-airbnb flex items-center gap-2 transition transform active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-black z-10"
        aria-label="Show all photos in photo tour"
      >
        <Grid className="w-4 h-4 text-gray-900" />
        <span>Show all photos</span>
      </button>
    </div>
  );
}

