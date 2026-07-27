import { memo } from 'react';
import type { PhotoTourImage } from '../../data/photoTourData';

interface PhotoCardProps {
  image: PhotoTourImage;
  globalIndex: number;
  onOpenLightbox: (index: number) => void;
}

export const PhotoCard = memo(function PhotoCard({
  image,
  globalIndex,
  onOpenLightbox,
}: PhotoCardProps) {
  return (
    <div
      onClick={() => onOpenLightbox(globalIndex)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenLightbox(globalIndex);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View full size image: ${image.caption}`}
      className="group cursor-pointer rounded-[12px] overflow-hidden bg-gray-100 shadow-airbnb-card focus:outline-none focus:ring-2 focus:ring-black relative transition-all duration-200"
    >
      <img
        src={image.url}
        alt={image.caption}
        className="w-full h-full object-cover rounded-[12px] group-hover:scale-[1.02] group-hover:brightness-95 transition-all duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});
