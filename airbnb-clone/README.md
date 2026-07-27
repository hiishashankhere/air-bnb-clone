# Airbnb Listing Page Clone (Production-Grade Engineering)

A pixel-perfect, production-quality clone of a real Airbnb listing page built with React 19, TypeScript, Tailwind CSS, Framer Motion, and React Router.

---

## 🌟 Key Features

1. **Listing Page (`/`)**:
   - **Navigation Bar**: Airbnb logo, search bar pill, user profile menu, language selector.
   - **Header & Title**: Property title, Share modal clipboard copy, and Save heart wishlist toggle.
   - **Hero Gallery Grid**: 5-photo grid with exact Airbnb aspect ratios, rounded corners, hover brightness transitions, and a "Show all photos" action.
   - **Guest Favourite Card**: Laurel wreath badge, overall rating (4.95), and review count (19 reviews).
   - **Listing Details**: Host summary, property highlights, description with translation notice, "Where you'll sleep" arrangement cards.
   - **Amenities Modal**: Categorized 50+ amenities popup with Lucide icons.
   - **Interactive Calendar**: 2-month view (October 2026 / November 2026) with selection range and "Clear dates".
   - **Reviews Section**: Overall rating banner, category breakdown (Cleanliness 5.0, Accuracy 5.0, Check-in 5.0, etc.), filter tag pills, review cards, and search modal.
   - **Location & Map**: Mock interactive map with zoom controls, custom pin, and neighbourhood highlights.
   - **Host Profile & Co-Hosts**: Mirashya Homes card with stats (1,463 reviews, 4.68★ rating, 2 years hosting), co-host avatars, and message action.
   - **Things to Know**: Cancellation policy, House rules, Safety & property details.
   - **More Stays Nearby**: Interactive carousel/grid of surrounding listings.
   - **Sticky Booking Card**: Desktop fixed right column card with date picker, guest popover selector, price calculation, and reserve gradient button.

2. **Photo Tour View (`?modal=PHOTO_TOUR_SCROLLABLE`)**:
   - Fullscreen scrollable view featuring all 13+ listing photos categorized into Living room, Bedroom, Kitchen, Bathroom, Gym, Exterior, Pool.
   - Sticky category filter bar and top sticky navigation.

3. **Lightbox View (`?modal=PHOTO_TOUR_LIGHTBOX`)**:
   - Fullscreen dark backdrop-blur image viewer.
   - Photo counter (`X / Y`), Share, Save, Close actions.
   - Keyboard navigation (`←`, `→`, `Escape`) and Framer Motion crossfade transitions.

---

## 🏗️ Architecture & Project Structure

```
airbnb-clone/
├── architecture.md           # Deep-dive system architecture & scaling strategy
├── README.md                 # Project documentation & notes
├── index.html                # HTML entry point
├── package.json              # Project metadata & dependencies
├── tailwind.config.ts        # Custom Airbnb brand colors & theme configuration
├── vite.config.ts            # Vite bundler & path aliasing setup
└── src/
    ├── main.tsx              # React mounting entry point (StrictMode + BrowserRouter)
    ├── App.tsx               # Primary layout, URL query state & section assembly
    ├── types/
    │   └── listing.ts        # TypeScript interfaces for listing metadata & photos
    ├── data/
    │   └── listing.ts        # Rich mock data matching the reference site details
    ├── utils/
    │   └── iconHelpers.tsx   # Helper functions for dynamic Lucide icon rendering
    ├── components/
    │   └── layout/
    │       ├── Navbar.tsx    # Header navbar
    │       └── Footer.tsx    # Footer component
    ├── sections/
    │   ├── ListingHeader.tsx # Title, share & save actions
    │   ├── HeroGallery.tsx   # 5-photo hero gallery grid
    │   ├── HostSummarySection.tsx # Host summary & guest favorite card
    │   ├── GuestFavoriteCard.tsx  # Laurel wreath rating card
    │   ├── HighlightsSection.tsx   # Highlights list
    │   ├── DescriptionSection.tsx  # Property description
    │   ├── SleepingSection.tsx     # Sleeping arrangements
    │   ├── AmenitiesSection.tsx    # Amenities grid & modal trigger
    │   ├── AmenitiesModal.tsx      # Full amenities modal
    │   ├── CalendarSection.tsx     # 2-month calendar grid
    │   ├── ReviewsSection.tsx      # Ratings, category breakdown & filter tags
    │   ├── ReviewsModal.tsx        # Searchable reviews modal
    │   ├── MapSection.tsx          # Interactive map & neighbourhood highlights
    │   ├── HostProfileSection.tsx  # Host card, stats & co-hosts list
    │   ├── ThingsToKnowSection.tsx # Cancellation, house rules & safety details
    │   ├── NearbyStaysSection.tsx  # Nearby stays carousel
    │   └── BookingCard.tsx         # Desktop sticky booking card
    └── features/
        ├── photo-tour/
        │   └── PhotoTourModal.tsx  # Scrollable photo tour overlay
        └── lightbox/
            └── LightboxModal.tsx   # Lightbox modal with keyboard controls
```

---

## ⚡ Performance Notes

- **Optimized Image Loading**: High-resolution Unsplash assets configured with image compression parameters (`q_80&w=1200&auto=format&fit=crop`) and standard `loading="lazy"` attributes for off-screen images.
- **Framer Motion Hardware Acceleration**: GPU-accelerated CSS transforms for smooth modal scaling and backdrop blur transitions.
- **Zero Cumulative Layout Shift (CLS)**: Fixed aspect ratio image wrappers prevent layout jumping during asset loading.

---

## ♿ Accessibility Checklist

- **Keyboard Navigation**: Full keyboard navigation across all interactive buttons, modals, and tabs.
- **Focus Management**: Modals feature focus trapping and handle the `Escape` key for seamless dismissal.
- **Lightbox Keyboard Shortcuts**: `ArrowLeft` (previous photo), `ArrowRight` (next photo), `Escape` (close viewer).
- **ARIA Attributes**: Proper use of `role="dialog"`, `aria-modal="true"`, `aria-label`, and `aria-labelledby` across modals and buttons.
- **Semantic HTML**: Structural standard HTML tags (`header`, `main`, `footer`, `section`, `h1`, `h2`, `h3`).

---

## 🤖 AI Usage Notes

- Built leveraging modern AI-assisted engineering practices for structured component generation, type safety, and pixel-perfect design alignment.
- All code implementations are original, production-ready, clean, and strictly structured according to modern React & TypeScript best practices.

---

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript type check
npx tsc -b

# Build for production
npm run build
```
