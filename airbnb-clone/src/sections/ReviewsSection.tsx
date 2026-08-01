import { Star } from 'lucide-react';
import { memo, useState } from 'react';
import { BaseModal } from '../components/common/BaseModal';
import { SectionContainer } from '../components/common/SectionContainer';
import type { Review, ReviewCategory, ReviewFilterTag } from '../types/listing';
import { renderAmenityIcon } from '../utils/iconHelpers';
import { ReviewsModal } from './ReviewsModal';

interface ReviewsSectionProps {
  rating: number;
  reviewsCount: number;
  categories: ReviewCategory[];
  filterTags: ReviewFilterTag[];
  reviews: Review[];
}

export const ReviewsSection = memo(function ReviewsSection({
  rating,
  reviewsCount,
  categories,
  filterTags,
  reviews,
}: ReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const displayReviews = selectedTag
    ? reviews.filter((r) => r.content.toLowerCase().includes(selectedTag.toLowerCase()))
    : reviews;

  return (
    <SectionContainer>
      {/* Big Rating Banner */}
      <div className="text-center py-8 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2 text-[#FF385C]">
          <span className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
            {rating.toFixed(2)}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mt-2">Guest favourite</h3>
        <p className="text-sm text-gray-600 max-w-sm mx-auto mt-1">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          type="button"
          onClick={() => setIsHowItWorksOpen(true)}
          className="text-xs font-semibold text-gray-900 underline mt-2 hover:text-gray-700 focus:outline-none"
        >
          How reviews work
        </button>
      </div>

      {/* Categories Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-8 border-b border-gray-200 text-center">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center">
            <span className="text-xs font-semibold text-gray-600 mb-1">{cat.name}</span>
            <span className="text-lg font-bold text-gray-900 mb-2">{cat.rating.toFixed(1)}</span>
            <div className="p-2 bg-gray-50 rounded-full border border-gray-100 text-gray-800">
              {renderAmenityIcon(cat.icon)}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tag Pills */}
      <div className="flex flex-wrap items-center gap-2.5 py-6">
        {filterTags.map((tag) => {
          const isSelected = selectedTag === tag.label;
          return (
            <button
              key={tag.label}
              onClick={() => setSelectedTag(isSelected ? null : tag.label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-black ${
                isSelected
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-800 hover:border-black'
              }`}
            >
              <span>{tag.label}</span>
              <span className="text-gray-500 font-normal">{tag.count}</span>
            </button>
          );
        })}
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
        {displayReviews.map((rev) => (
          <div key={rev.id} className="space-y-3">
            <div className="flex items-center gap-3">
              {rev.authorAvatar ? (
                <img
                  src={rev.authorAvatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
              ) : (
                <div className="w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {rev.author[0]}
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900 text-base">{rev.author}</div>
                <div className="text-xs text-gray-500">{rev.tenure}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-0.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-gray-900" />
                ))}
              </div>
              <span>·</span>
              <span>{rev.date}</span>
            </div>

            <p className="text-sm text-gray-800 leading-relaxed line-clamp-4 font-normal">{rev.content}</p>

            {rev.content.length > 140 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-gray-900 underline hover:text-gray-700 focus:outline-none"
              >
                Show more
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 px-6 py-3 border border-gray-900 rounded-xl font-semibold text-gray-900 hover:bg-gray-100 transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black"
      >
        Show all {reviewsCount} reviews
      </button>

      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rating={rating}
        reviewsCount={reviewsCount}
        categories={categories}
        reviews={reviews}
      />

      <BaseModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        title="How reviews work"
        maxWidthClass="max-w-2xl"
      >
        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            This demo uses locally defined review data to mirror how Airbnb aggregates guest feedback.
            In a real product, the rating would be computed from verified stays, category scores, and
            moderation rules.
          </p>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-900">Current listing snapshot</p>
            <p className="text-sm text-gray-600">{rating.toFixed(2)} average rating</p>
            <p className="text-sm text-gray-600">{reviewsCount} guest reviews</p>
            <p className="text-sm text-gray-600">{filterTags.length} highlighted review topics</p>
          </div>
          <p className="text-xs text-gray-500">
            Everything stays in the frontend for this assignment, so no review data is sent anywhere.
          </p>
        </div>
      </BaseModal>
    </SectionContainer>
  );
});
