export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: 'Living room' | 'Bedroom' | 'Full kitchen' | 'Full bathroom' | 'Gym' | 'Exterior' | 'Pool' | 'Hot tub';
  width?: number;
  height?: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'Popular' | 'Bathroom' | 'Bedroom & laundry' | 'Entertainment' | 'Heating & cooling' | 'Home safety' | 'Internet & office' | 'Kitchen & dining' | 'Location features' | 'Outdoor' | 'Parking & facilities';
  icon: string; // Lucide icon name or SVG key
  description?: string;
}

export interface SleepingArrangement {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface ReviewCategory {
  name: 'Cleanliness' | 'Accuracy' | 'Check-in' | 'Communication' | 'Location' | 'Value';
  rating: number;
  icon: string;
}

export interface ReviewFilterTag {
  label: string;
  count: number;
}

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  tenure: string; // e.g. "2 months on Airbnb"
  date: string; // e.g. "May 2026"
  rating: number;
  content: string;
}

export interface CoHost {
  id: string;
  name: string;
  avatar: string;
}

export interface HostInfo {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  reviewCount: number;
  rating: number;
  bioDetails: string[];
  coHosts: CoHost[];
  responseRate: number;
  responseSpeed: string;
}

export interface NearbyStay {
  id: string;
  title: string;
  pricePerNight: number;
  rating: number;
  image: string;
}

export interface ListingData {
  id: string;
  title: string;
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
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  photos: Photo[];
  host: HostInfo;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  description: string;
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  reviewCategories: ReviewCategory[];
  reviewFilterTags: ReviewFilterTag[];
  reviews: Review[];
  neighbourhoodHighlights: string;
  lat: number;
  lng: number;
  houseRules: string[];
  safetyProperty: string[];
  cancellationPolicy: string;
  nearbyStays: NearbyStay[];
}
