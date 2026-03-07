import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  faqData?: { question: string; answer: string }[];
  breadcrumbItems?: { name: string; item: string }[];
  ratingValue?: number;
  reviewCount?: number;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Empire Chauffeur NYC | Premier Executive Transportation",
  description = "NYC's premier executive transportation firm. Providing discreet, reliable, and professional chauffeur services for over 20 years. Airport transfers, corporate travel, and long-distance service.",
  canonical = "https://www.empirechauffeurnyc.com/",
  ogImage = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop",
  ogType = "website",
  keywords = "chauffeur nyc, executive car service nyc, airport transfer jfk, luxury car service new york, private driver nyc, jfk airport car service",
  faqData,
  breadcrumbItems,
  ratingValue = 4.9,
  reviewCount = 124
}) => {
  const siteTitle = title.includes("Empire Chauffeur") ? title : `${title} | Empire Chauffeur NYC`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* AI Agent / Search Engine Specifics */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#C5A059" />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LimoService",
          "name": "Empire Chauffeur NYC",
          "image": ogImage,
          "@id": canonical,
          "url": canonical,
          "telephone": "+13053219622",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Manhattan",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "postalCode": "10001",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.7128,
            "longitude": -74.0060
          },
          "areaServed": ["New York City", "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "JFK", "LGA", "EWR"],
          "priceRange": "$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": reviewCount
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        })}
      </script>

      {/* FAQ Schema */}
      {faqData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbItems && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.item
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};
