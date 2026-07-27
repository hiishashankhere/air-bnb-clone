import { Check } from 'lucide-react';
import { memo } from 'react';
import type { PhotoCategorySectionData } from '../../data/photoTourData';
import { PhotoGrid } from './PhotoGrid';

interface PhotoSectionProps {
  section: PhotoCategorySectionData;
  allPhotos: Array<{ id: string }>;
  onOpenLightbox: (index: number) => void;
}

export const PhotoSection = memo(function PhotoSection({
  section,
  allPhotos,
  onOpenLightbox,
}: PhotoSectionProps) {
  return (
    <section id={section.id} className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-8 lg:gap-[80px] items-start">
      {/* Left Column (38%): Sticky Category Details & Amenities */}
      <div className="lg:sticky lg:top-24 self-start space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-base text-gray-600 font-normal mt-2 leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        {/* Category Amenities Bullet List */}
        {section.amenities && section.amenities.length > 0 && (
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Amenities in this area
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-gray-800 font-medium">
              {section.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="p-1 bg-gray-100 rounded-full text-gray-800 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (62%): Image Grid */}
      <div>
        <PhotoGrid
          images={section.images}
          allPhotos={allPhotos}
          onOpenLightbox={onOpenLightbox}
        />
      </div>
    </section>
  );
});
