import { BaseModal } from '../components/common/BaseModal';
import type { Amenity } from '../types/listing';
import { renderAmenityIcon } from '../utils/iconHelpers';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenities: Amenity[];
}

export function AmenitiesModal({ isOpen, onClose, amenities }: AmenitiesModalProps) {
  // Group amenities by category
  const categories = Array.from(new Set(amenities.map((a) => a.category)));

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="What this place offers"
      ariaLabelledBy="amenities-modal-title"
      maxWidthClass="max-w-2xl"
    >
      <div className="p-6 sm:p-8 space-y-8 divide-y divide-gray-100">
        {categories.map((category) => {
          const categoryItems = amenities.filter((a) => a.category === category);
          return (
            <div key={category} className="pt-6 first:pt-0">
              <h3 className="font-bold text-gray-900 text-lg mb-4">{category}</h3>
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-1">
                    <div className="text-gray-800 shrink-0">{renderAmenityIcon(item.icon)}</div>
                    <span className="text-base text-gray-800 font-normal">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </BaseModal>
  );
}


