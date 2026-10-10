// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCategoryById, getProductsByCategory } from '../services/productService';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductModal from '../components/ProductModal';
import { ArrowLeft, Filter, SlidersHorizontal, Sparkles, Layers } from 'lucide-react';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('default');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getCategoryById(categoryId),
      getProductsByCategory(categoryId)
    ])
      .then(([catData, prodData]) => {
        if (isMounted) {
          setCategory(catData);
          setProducts(prodData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading category data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  // Apply filters and sorting
  const filteredProducts = products.filter((p) => {
    if (selectedSizeFilter === 'ALL') return true;
    return p.sizes?.includes(selectedSizeFilter);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    if (sortBy === 'discount') {
      const discA = a.mrp ? (a.mrp - a.price) / a.mrp : 0;
      const discB = b.mrp ? (b.mrp - b.price) / b.mrp : 0;
      return discB - discA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-stone-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pb-20">
        {/* Category Header Banner */}
        <div className="bg-[#4A101D] text-white py-12 sm:py-16 relative overflow-hidden border-b border-[#D4AF37]/30">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Home / Categories Link */}
            <Link
              to="/#products"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setTimeout(() => {
                  const elem = document.getElementById('products');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-2 text-amber-200 hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </Link>

            <div className="max-w-3xl">
              <span className="text-[#D4A96A] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
                <img src="/images/Flower.png" alt="Flower motif" className="w-3.5 h-3.5 object-contain" />
                <span>Paaruni Catalogue &bull; {category?.count || sortedProducts.length} Designs Found</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
                {category ? category.name : 'Category Collection'}
              </h1>
              {category?.description && (
                <p className="text-stone-200 text-base sm:text-lg font-light leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Sorting Toolbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            {/* Filter By Size */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5 text-[#4A101D]" />
                Filter Size:
              </span>
              {['ALL', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(sz)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${selectedSizeFilter === sz
                    ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <SlidersHorizontal className="w-4 h-4 text-[#6B1D2F]" />
              <label htmlFor="sort-select" className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B1D2F]/20 cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <ProductGrid
            products={sortedProducts}
            loading={loading}
            onQuickView={(p) => setActiveModalProduct(p)}
          />
        </div>
      </main>

      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton variant="floating" phoneNumber="918087169690" />

      {/* Quick View Modal */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  );
}
