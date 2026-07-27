import { Star } from 'lucide-react';

interface GuestFavoriteCardProps {
  rating: number;
  reviewsCount: number;
  description: string;
}

export function GuestFavoriteCard({ rating, reviewsCount, description }: GuestFavoriteCardProps) {
  return (
    <div className="w-full border border-gray-200 rounded-2xl p-6 my-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white shadow-airbnb-card">
      {/* Left: Laurel Wreath + Badge Title */}
      <div className="flex items-center gap-6 text-center sm:text-left">
        <div className="flex items-center text-gray-900 shrink-0 select-none">
          {/* Authentic Laurel Wreath SVG */}
          <svg className="w-12 h-14 fill-current text-gray-900" viewBox="0 0 40 48" aria-hidden="true">
            <path d="M11.5 8.5C9.5 13 8 18.5 8 24c0 6.5 2.5 12 7 15.5l1.5.8 1.5-.8c4.5-3.5 7-9 7-15.5 0-5.5-1.5-11-3.5-15.5C20.5 4.5 18 2 15 2s-5.5 2.5-3.5 6.5zm7 29.8C15 35.5 13 30.5 13 24c0-5 1.5-10 3-14 1.5 4 3 9 3 14 0 6.5-2 11.5-5.5 14.3z" />
          </svg>
          <div className="mx-2 text-center">
            <span className="font-extrabold text-2xl tracking-tight block leading-tight text-gray-900">
              Guest
            </span>
            <span className="font-extrabold text-2xl tracking-tight block leading-tight text-gray-900">
              favourite
            </span>
          </div>
          <svg className="w-12 h-14 fill-current text-gray-900 scale-x-[-1]" viewBox="0 0 40 48" aria-hidden="true">
            <path d="M11.5 8.5C9.5 13 8 18.5 8 24c0 6.5 2.5 12 7 15.5l1.5.8 1.5-.8c4.5-3.5 7-9 7-15.5 0-5.5-1.5-11-3.5-15.5C20.5 4.5 18 2 15 2s-5.5 2.5-3.5 6.5zm7 29.8C15 35.5 13 30.5 13 24c0-5 1.5-10 3-14 1.5 4 3 9 3 14 0 6.5-2 11.5-5.5 14.3z" />
          </svg>
        </div>

        <div className="max-w-xs text-sm font-medium text-gray-600 leading-relaxed">
          {description}
        </div>
      </div>

      {/* Right: Rating & Review count */}
      <div className="flex items-center gap-8 border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-8">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-gray-900 leading-none">{rating.toFixed(2)}</div>
          <div className="flex items-center justify-center gap-0.5 mt-1.5 text-gray-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current text-gray-900" />
            ))}
          </div>
        </div>

        <div className="text-center border-l border-gray-200 pl-8">
          <div className="text-2xl font-extrabold text-gray-900 leading-none">{reviewsCount}</div>
          <button className="text-xs font-semibold text-gray-900 underline mt-1.5 hover:text-gray-700 focus:outline-none">
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

