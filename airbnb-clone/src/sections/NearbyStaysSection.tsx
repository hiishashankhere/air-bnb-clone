import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { memo, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import type { NearbyStay } from '../types/listing';

interface NearbyStaysSectionProps {
  stays: NearbyStay[];
}

export const NearbyStaysSection = memo(function NearbyStaysSection({ stays }: NearbyStaysSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(stays.length / 2) || 1;
  const startIndex = (currentPage - 1) * 2;
  const visibleStays = stays.slice(startIndex, startIndex + 2);

  return (
    <SectionContainer hasDivider={false}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">More stays nearby</h2>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span>
            {currentPage} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleStays.map((stay) => (
          <div key={stay.id} className="group cursor-pointer">
            <div className="h-64 rounded-2xl overflow-hidden mb-3 relative bg-gray-100 shadow-airbnb-card">
              <img
                src={stay.image}
                alt={stay.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-base group-hover:underline line-clamp-1">
              {stay.title}
            </h3>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="font-semibold text-gray-900">
                ₹{stay.pricePerNight.toLocaleString('en-IN')}{' '}
                <span className="font-normal text-gray-600">night</span>
              </span>
              <div className="flex items-center gap-1 font-medium text-gray-900">
                <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
                <span>{stay.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
});
