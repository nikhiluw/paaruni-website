// src/components/CategoryGrid.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/productService';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getCategories()
      .then((data) => {
        if (isMounted) {
          setCategories(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load categories:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-20 bg-[#FAF4EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#6B1D2F] font-semibold text-xs uppercase tracking-widest bg-[#6B1D2F]/10 px-4 py-1.5 rounded-full mb-3 border border-[#6B1D2F]/20">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A101D] mb-3">
            Shop By Category
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
            <img src="/images/Flower.png" alt="Flower motif" className="w-6 h-6 object-contain" />
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
          </div>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            From daily short kurtis to lavish 3-piece festive suit sets, select a category below to explore our budget-friendly designs.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="h-96 bg-stone-200/70 rounded-3xl animate-pulse border border-stone-300/50"
              />
            ))}
          </div>
        ) : (
          /* Category Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-stone-900 border border-stone-200/50 flex flex-col h-[420px]"
              >
                {/* Background Image with Hover Zoom */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 bg-[#6B1D2F]/20 group-hover:bg-[#6B1D2F]/30 transition-colors duration-500" />
                </div>

                {/* Top Badge: Item Count */}
                <div className="relative z-10 p-6 flex justify-between items-start">
                  <span className="bg-[#6B1D2F]/90 text-[#F3DF8A] border border-[#D4AF37]/50 backdrop-blur-md text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                    {cat.count} {cat.count === 1 ? 'Design' : 'Designs'} Available
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-[#4A101D] transition-all duration-300 shadow-md">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 mt-auto p-6 sm:p-8 flex flex-col justify-end text-left">
                  <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest mb-1">
                    {cat.tagline || 'Ethnic Collection'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-[#F3DF8A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 mb-4 font-light leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-white group-hover:text-[#D4AF37] font-semibold text-sm transition-colors">
                    <span>Browse {cat.name}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
