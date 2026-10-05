// src/components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function ProductGrid({ products = [], loading = false, onQuickView }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-stone-200/60 rounded-3xl h-[450px] animate-pulse border border-stone-300/40"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#4A101D] mb-2">
          No Products Found
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-6">
          We couldn't find any active products matching your selected criteria. Try resetting your filter or explore other categories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
