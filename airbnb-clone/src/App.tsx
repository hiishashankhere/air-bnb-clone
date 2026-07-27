import { lazy, Suspense } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SEOHead } from './components/seo/SEOHead';
import { listingData } from './data/listing';
import { useListingState } from './hooks/useListingState';
import { AmenitiesSection } from './sections/AmenitiesSection';
import { BookingCard } from './sections/BookingCard';
import { CalendarSection } from './sections/CalendarSection';
import { DescriptionSection } from './sections/DescriptionSection';
import { HeroGallery } from './sections/HeroGallery';
import { HighlightsSection } from './sections/HighlightsSection';
import { HostProfileSection } from './sections/HostProfileSection';
import { HostSummarySection } from './sections/HostSummarySection';
import { ListingHeader } from './sections/ListingHeader';
import { MapSection } from './sections/MapSection';
import { NearbyStaysSection } from './sections/NearbyStaysSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { SleepingSection } from './sections/SleepingSection';
import { ThingsToKnowSection } from './sections/ThingsToKnowSection';

// Code-split heavy modal overlays with React.lazy
const PhotoTourModal = lazy(() =>
  import('./features/photo-tour/PhotoTourModal').then((m) => ({ default: m.PhotoTourModal }))
);
const LightboxModal = lazy(() =>
  import('./features/lightbox/LightboxModal').then((m) => ({ default: m.LightboxModal }))
);

export default function App() {
  const {
    isPhotoTourOpen,
    isLightboxOpen,
    initialLightboxIndex,
    checkIn,
    checkOut,
    handleOpenPhotoTour,
    handleOpenLightbox,
    handleCloseModal,
    handleSelectDates,
    handleClearDates,
  } = useListingState();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-gray-900 selection:bg-[#FF385C] selection:text-white">
      {/* Dynamic SEO Meta Tags & Schema.org JSON-LD Structured Data */}
      <SEOHead
        title={listingData.title}
        description={listingData.description}
        location={listingData.location}
        rating={listingData.rating}
        reviewsCount={listingData.reviewsCount}
        pricePerNight={listingData.pricePerNight}
        heroImage={listingData.photos[0]?.url || ''}
      />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6">
        {/* Listing Title & Actions */}
        <ListingHeader title={listingData.title} />

        {/* 5-Photo Hero Gallery */}
        <HeroGallery
          photos={listingData.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Left Column Sections */}
          <div className="lg:col-span-7 space-y-2">
            <HostSummarySection
              type={listingData.type}
              location={listingData.location}
              guestsCount={listingData.guestsCount}
              bedroomsCount={listingData.bedroomsCount}
              bedsCount={listingData.bedsCount}
              bathroomsCount={listingData.bathroomsCount}
              rating={listingData.rating}
              reviewsCount={listingData.reviewsCount}
              isGuestFavorite={listingData.isGuestFavorite}
              guestFavoriteDescription={listingData.guestFavoriteDescription}
              host={listingData.host}
            />

            <HighlightsSection highlights={listingData.highlights} />

            <DescriptionSection description={listingData.description} />

            <SleepingSection arrangements={listingData.sleepingArrangements} />

            <AmenitiesSection amenities={listingData.amenities} />

            <CalendarSection
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectDates={handleSelectDates}
              onClearDates={handleClearDates}
              locationName="Candolim"
            />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-5 relative hidden lg:block pl-4">
            <BookingCard
              pricePerNight={listingData.pricePerNight}
              rating={listingData.rating}
              reviewsCount={listingData.reviewsCount}
              cleaningFee={listingData.cleaningFee}
              serviceFee={listingData.serviceFee}
              checkIn={checkIn}
              checkOut={checkOut}
              onClearDates={handleClearDates}
            />
          </div>
        </div>

        {/* Full-width lower sections */}
        <div className="mt-8">
          <ReviewsSection
            rating={listingData.rating}
            reviewsCount={listingData.reviewsCount}
            categories={listingData.reviewCategories}
            filterTags={listingData.reviewFilterTags}
            reviews={listingData.reviews}
          />

          <MapSection
            location={listingData.location}
            highlights={listingData.neighbourhoodHighlights}
          />

          <HostProfileSection host={listingData.host} />

          <ThingsToKnowSection
            cancellationPolicy={listingData.cancellationPolicy}
            houseRules={listingData.houseRules}
            safetyProperty={listingData.safetyProperty}
          />

          <NearbyStaysSection stays={listingData.nearbyStays} />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Code-Split Suspense Modals */}
      <Suspense fallback={null}>
        {isPhotoTourOpen && (
          <PhotoTourModal
            isOpen={isPhotoTourOpen}
            onClose={handleCloseModal}
            photos={listingData.photos}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {isLightboxOpen && (
          <LightboxModal
            isOpen={isLightboxOpen}
            onClose={handleCloseModal}
            photos={listingData.photos}
            initialIndex={initialLightboxIndex}
          />
        )}
      </Suspense>
    </div>
  );
}
