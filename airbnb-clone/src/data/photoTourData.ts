export interface PhotoTourImage {
  id: string;
  url: string;
  caption: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
}

export interface PhotoCategorySectionData {
  id: string;
  title: string;
  description: string;
  amenities: string[];
  images: PhotoTourImage[];
}

export const photoTourCategorySections: PhotoCategorySectionData[] = [
  {
    id: 'living-room',
    title: 'Living room',
    description: 'Cozy lounge area with warm ambient lighting & tropical garden views',
    amenities: ['Air conditioning', 'Smart TV', 'Ceiling fan', 'Wi-Fi', 'Sofa seating', 'Dedicated workspace'],
    images: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
        caption: 'Living room - Cozy lounge area with warm ambient lighting',
        aspectRatio: 'wide',
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
        caption: 'Living room - Elegant seating with indoor tropical plants',
        aspectRatio: 'landscape',
      },
      {
        id: 'photo-10',
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
        caption: 'Living room sofa - Comfortable seating for relaxing',
        aspectRatio: 'landscape',
      },
      {
        id: 'photo-11',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        caption: 'Dining area - Dining table for meals and workspace',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Master bedroom with plush double bed, wardrobe & mirror',
    amenities: ['Double bed', 'Full-length mirror', 'Air conditioning', 'Wardrobe', 'Hangers', 'Bed linens'],
    images: [
      {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1600&auto=format&fit=crop',
        caption: 'Bedroom - Master bedroom with comfortable king bed & full-length mirror',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'kitchen',
    title: 'Full kitchen',
    description: 'Fully equipped kitchen with appliances and dining essentials',
    amenities: ['Refrigerator', 'Microwave', 'Induction cooktop', 'Electric kettle', 'Cookware', 'Dishes & silverware'],
    images: [
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop',
        caption: 'Full kitchen - Modern appliances and stylish wooden cabinetry',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'bathroom',
    title: 'Full bathroom',
    description: 'Modern bathroom featuring rainfall shower & luxury tiles',
    amenities: ['Rainfall shower', 'Hot water', 'Hair dryer', 'Shampoo', 'Shower gel', 'Body soap'],
    images: [
      {
        id: 'photo-5',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
        caption: 'Full bathroom - Modern bathroom with rainfall shower & luxury tiles',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'hot-tub',
    title: 'Hot tub',
    description: 'Private romantic Jacuzzi tub with ambient spotlights',
    amenities: ['Private Jacuzzi', 'Hydrotherapy jets', 'Hot water', 'Mood lighting'],
    images: [
      {
        id: 'photo-6',
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop',
        caption: 'Hot tub - Private romantic Jacuzzi tub with ambient wall spotlights',
        aspectRatio: 'landscape',
      },
      {
        id: 'photo-12',
        url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
        caption: 'Jacuzzi lounge - Relaxing spot near the hot tub',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'pool',
    title: 'Pool',
    description: 'Shared outdoor swimming pool surrounded by tropical greenery',
    amenities: ['Outdoor pool', 'Sun loungers', 'Garden view'],
    images: [
      {
        id: 'photo-7',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop',
        caption: 'Pool - Swimming pool surrounded by tropical lush greenery',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'gym',
    title: 'Gym',
    description: 'Equipped fitness centre available on premises',
    amenities: ['Treadmill', 'Free weights', 'Exercise bike', 'Air conditioning'],
    images: [
      {
        id: 'photo-8',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
        caption: 'Gym - Fully equipped fitness centre on premises',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'exterior',
    title: 'Exterior & Balcony',
    description: 'Building facade and scenic balcony views of Candolim',
    amenities: ['Private balcony', 'Outdoor seating', 'Elevator access', 'Free parking'],
    images: [
      {
        id: 'photo-9',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
        caption: 'Exterior - Modern apartment facade in Candolim',
        aspectRatio: 'landscape',
      },
      {
        id: 'photo-13',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
        caption: 'Balcony view - Scenic view of greenery from the balcony',
        aspectRatio: 'landscape',
      },
    ],
  },
];
