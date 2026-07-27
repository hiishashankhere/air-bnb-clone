import { memo } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import type { HostInfo } from '../types/listing';
import { GuestFavoriteCard } from './GuestFavoriteCard';

interface HostSummarySectionProps {
  type: string;
  location: string;
  guestsCount: number;
  bedroomsCount: number;
  bedsCount: number;
  bathroomsCount: number;
  rating: number;
  reviewsCount: number;
  isGuestFavorite: boolean;
  guestFavoriteDescription: string;
  host: HostInfo;
}

export const HostSummarySection = memo(function HostSummarySection({
  type,
  location,
  guestsCount,
  bedroomsCount,
  bedsCount,
  bathroomsCount,
  rating,
  reviewsCount,
  isGuestFavorite,
  guestFavoriteDescription,
  host,
}: HostSummarySectionProps) {
  return (
    <SectionContainer className="!pt-0">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
        {type} in {location}
      </h2>
      <p className="text-sm text-gray-600 mt-1 font-normal">
        {guestsCount} guests · {bedroomsCount} bedroom · {bedsCount} bed · {bathroomsCount} bathroom
      </p>

      {/* Guest Favorite Badge */}
      {isGuestFavorite && (
        <GuestFavoriteCard
          rating={rating}
          reviewsCount={reviewsCount}
          description={guestFavoriteDescription}
        />
      )}

      {/* Host Row */}
      <div className="flex items-center gap-4 pt-4">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div>
          <div className="font-semibold text-gray-900 text-base">Hosted by {host.name}</div>
          <div className="text-sm text-gray-500">{host.yearsHosting} years hosting</div>
        </div>
      </div>
    </SectionContainer>
  );
});

