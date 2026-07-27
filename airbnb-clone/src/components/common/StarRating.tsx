import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showFiveStars?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  reviewsCount,
  size = 'sm',
  showFiveStars = false,
  className = '',
}: StarRatingProps) {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starClass = iconSizes[size];

  return (
    <div className={`flex items-center gap-1 font-semibold text-gray-900 ${className}`}>
      {showFiveStars ? (
        <div className="flex items-center gap-0.5">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <Star key={i} className={`${starClass} fill-current text-gray-900`} />
          ))}
        </div>
      ) : (
        <Star className={`${starClass} fill-current text-gray-900`} />
      )}
      <span>{rating.toFixed(2)}</span>
      {reviewsCount !== undefined && (
        <>
          <span className="text-gray-400">·</span>
          <span className="underline text-gray-500 font-normal">{reviewsCount} reviews</span>
        </>
      )}
    </div>
  );
}
