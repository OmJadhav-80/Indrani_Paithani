import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = `${SITE_CONFIG.domain}/indrani-official-logo.jpg`,
  type = 'website',
  productData = null
}) => {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.brandName}` : `${SITE_CONFIG.brandName} | Authentic Handloom Yeola Paithani & Pure Silk Sarees`;
  const metaDescription = description || 'Discover authentic Handloom Yeola Paithani sarees, Maharani Silk, Tissue Paithanis & bridal ethnic wear. Certified Silk Mark purity with worldwide express shipping.';
  const currentUrl = canonical ? `${SITE_CONFIG.domain}${canonical}` : SITE_CONFIG.domain;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescription);
    }

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

    // Inject Product JSON-LD Structured Data if available
    const existingScript = document.getElementById('product-schema-jsonld');
    if (existingScript) existingScript.remove();

    if (productData) {
      const script = document.createElement('script');
      script.id = 'product-schema-jsonld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': productData.title,
        'image': productData.images || [ogImage],
        'description': productData.description || metaDescription,
        'sku': productData.sku,
        'brand': {
          '@type': 'Brand',
          'name': SITE_CONFIG.brandName
        },
        'offers': {
          '@type': 'Offer',
          'url': currentUrl,
          'priceCurrency': 'INR',
          'price': productData.price,
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': productData.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
        }
      });
      document.head.appendChild(script);
    }
  }, [fullTitle, metaDescription, currentUrl, ogImage, productData]);

  return null;
};
