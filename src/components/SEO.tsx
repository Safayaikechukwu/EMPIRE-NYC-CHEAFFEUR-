import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Empire Chauffeur NYC | Premier Executive Transportation",
  description = "NYC's premier executive transportation firm. Providing discreet, reliable, and professional chauffeur services for over 20 years. Airport transfers, corporate travel, and long-distance service.",
  canonical = "https://www.empirechauffeurnyc.com/",
  ogImage = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop",
  ogType = "website"
}) => {
  const siteTitle = title.includes("Empire Chauffeur") ? title : `${title} | Empire Chauffeur NYC`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
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
    </Helmet>
  );
};
