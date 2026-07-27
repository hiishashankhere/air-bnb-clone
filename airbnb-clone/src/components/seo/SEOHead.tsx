import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  heroImage: string;
}

export function SEOHead({
  title,
  description,
  location,
  rating,
  reviewsCount,
  pricePerNight,
  heroImage,
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = `${title} - Houses for Rent in ${location} - Airbnb`;

    // Inject JSON-LD Schema.org Structured Data
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'VacationRental',
      name: title,
      description: description,
      image: heroImage,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'IN',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toString(),
        reviewCount: reviewsCount.toString(),
      },
      offers: {
        '@type': 'Offer',
        price: pricePerNight.toString(),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [title, description, location, rating, reviewsCount, pricePerNight, heroImage]);

  return null;
}
