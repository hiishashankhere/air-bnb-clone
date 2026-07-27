import { memo, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import type { Amenity } from '../types/listing';
import { renderAmenityIcon } from '../utils/iconHelpers';
import { AmenitiesModal } from './AmenitiesModal';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export const AmenitiesSection = memo(function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topAmenities = amenities.slice(0, 10);

  return (
    <SectionContainer>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {topAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-4">
            {renderAmenityIcon(amenity.icon)}
            <span className="text-base text-gray-800 font-normal">{amenity.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 px-6 py-3 border border-gray-900 rounded-xl font-semibold text-gray-900 hover:bg-gray-100 transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black"
      >
        Show all 50 amenities
      </button>

      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={amenities}
      />
    </SectionContainer>
  );
});

