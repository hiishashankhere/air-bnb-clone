import { Heart, Share } from 'lucide-react';
import { useState } from 'react';

interface ListingHeaderProps {
  title: string;
  isSaved: boolean;
  onToggleSaved: () => void;
}

export function ListingHeader({ title, isSaved, onToggleSaved }: ListingHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-6 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-[26px] font-semibold text-gray-900 tracking-tight">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-semibold text-gray-900 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition underline focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Share listing"
          >
            <Share className="w-4 h-4 stroke-[2]" />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={onToggleSaved}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition underline focus:outline-none focus:ring-2 focus:ring-black"
            aria-label={isSaved ? 'Saved to wishlists' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 stroke-[2] transition-colors ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-900'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
