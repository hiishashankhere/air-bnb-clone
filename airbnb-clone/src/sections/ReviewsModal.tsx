import { Search, Star } from 'lucide-react';
import { useState } from 'react';
import { BaseModal } from '../components/common/BaseModal';
import type { Review, ReviewCategory } from '../types/listing';
import { renderAmenityIcon } from '../utils/iconHelpers';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  reviewsCount: number;
  categories: ReviewCategory[];
  reviews: Review[];
}

export function ReviewsModal({
  isOpen,
  onClose,
  rating,
  reviewsCount,
  categories,
  reviews,
}: ReviewsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(
    (r) =>
      r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="reviews-modal-title"
      maxWidthClass="max-w-4xl"
    >
      <div className="flex flex-col h-full">
        {/* Custom Header with Rating Banner */}
        <div className="p-4 px-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Close reviews modal"
          >
            <span className="text-xl font-bold">×</span>
          </button>
          <div id="reviews-modal-title" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
            <Star className="w-5 h-5 fill-current text-gray-900" />
            <span>{rating.toFixed(2)}</span>
            <span>·</span>
            <span>{reviewsCount} reviews</span>
          </div>
          <div className="w-9" />
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          {/* Left Sidebar: Ratings Breakdown */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto space-y-4 bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-base mb-4">Ratings</h3>
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  {renderAmenityIcon(cat.icon)}
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                </div>
                <span className="font-bold text-gray-900 text-sm">{cat.rating.toFixed(1)}</span>
              </div>
            ))}
          </div>

          {/* Right Main Content: Search & Reviews */}
          <div className="md:col-span-2 p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search reviews"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:border-gray-900 transition"
                aria-label="Search reviews by keyword"
              />
            </div>

            <div className="space-y-6">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center gap-3 mb-2">
                    {rev.authorAvatar ? (
                      <img
                        src={rev.authorAvatar}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {rev.author[0]}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{rev.author}</div>
                      <div className="text-xs text-gray-500">{rev.tenure} · {rev.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed font-normal">{rev.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}


