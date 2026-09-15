import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ProductDetail } from '../components/ProductDetail';
import { SEO } from '../components/SEO';
import { NotFound } from './NotFound';

export const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!product) {
    return <NotFound />;
  }

  return (
    <div>
      <SEO
        title={product.title}
        description={product.description}
        canonical={`/product/${product.slug}`}
        ogImage={product.images[0]}
        productData={product}
      />
      <ProductDetail product={product} />
    </div>
  );
};
