import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-amber-200/60 overflow-hidden shadow-xs animate-pulse flex flex-col justify-between">
      <div>
        {/* Image Aspect Box Skeleton */}
        <div className="aspect-4/5 bg-amber-100/60" />
        
        {/* Text Content Skeletons */}
        <div className="p-4 space-y-2">
          <div className="h-3 bg-amber-200/50 rounded w-1/3" />
          <div className="h-4 bg-amber-200/80 rounded w-4/5" />
          <div className="h-3 bg-amber-100 rounded w-1/4" />
        </div>
      </div>

      {/* Footer Price Skeleton */}
      <div className="p-4 pt-0 flex justify-between items-center">
        <div className="h-6 bg-amber-200/60 rounded w-1/2" />
        <div className="h-8 w-8 bg-amber-200/60 rounded-xl" />
      </div>
    </div>
  );
};

export const CatalogSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};
