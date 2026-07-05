import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'tour package, ride-hailing app, car rental, tour agent, cab service, madurai cabs, budget tours, tourgadi, wave cabs',
  canonical = window.location.href,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType = 'website',
  ogImage = 'https://tourgadi.in/images/logo.png',
  schema,
}) => {
  useEffect(() => {
    // 1. Dynamic Title
    document.title = `${title} | TourGadi - Premium Tours & Rides`;

    // Helper to get or create a meta tag
    const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', robots);

    // 3. Open Graph Tags
    updateMetaTag('property', 'og:title', `${title} | TourGadi`);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', 'TourGadi');

    // 4. Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', `${title} | TourGadi`);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 6. JSON-LD Schema
    const existingScript = document.getElementById('tourgadi-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'tourgadi-jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up injected schema on unmount
      const scriptToRemove = document.getElementById('tourgadi-jsonld-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, canonical, robots, ogType, ogImage, schema]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
