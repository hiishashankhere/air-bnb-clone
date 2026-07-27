import { memo } from 'react';
import type { PhotoTourImage } from '../../data/photoTourData';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  images: PhotoTourImage[];
  allPhotos: Array<{ id: string }>;
  onOpenLightbox: (index: number) => void;
}

export const PhotoGrid = memo(function PhotoGrid({
  images,
  allPhotos,
  onOpenLightbox,
}: PhotoGridProps) {
  if (images.length === 1) {
    const globalIdx = allPhotos.findIndex((p) => p.id === images[0].id);
    return (
      <div className="h-[360px] sm:h-[440px] md:h-[500px]">
        <PhotoCard
          image={images[0]}
          globalIndex={globalIdx >= 0 ? globalIdx : 0}
          onOpenLightbox={onOpenLightbox}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((img) => {
        const globalIdx = allPhotos.findIndex((p) => p.id === img.id);
        return (
          <div key={img.id} className="h-[260px] sm:h-[300px]">
            <PhotoCard
              image={img}
              globalIndex={globalIdx >= 0 ? globalIdx : 0}
              onOpenLightbox={onOpenLightbox}
            />
          </div>
        );
      })}
    </div>
  );
});
