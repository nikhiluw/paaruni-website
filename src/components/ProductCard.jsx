// src/components/ProductCard.jsx
import React, { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';
import { Eye, Tag, Sparkles, X, Check } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');

  if (!product) return null;

  // Calculate discount percentage
  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const currentImage = product.images?.[activeImageIndex] || product.images?.[0];
  const secondaryImage = product.images?.[1] || currentImage;

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer">
        <img
          src={isHovered && secondaryImage ? secondaryImage : currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 items-start">
            {discountPercent > 0 && (
              <span className="bg-[#6B1D2F] text-[#F3DF8A] border border-[#D4AF37]/40 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                {discountPercent}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-[#D4AF37] text-[#4A101D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                Best Seller
              </span>
            )}
          </div>

          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm border border-white/20">
            {product.pieces} Piece {product.length ? `(${product.length})` : ''}
          </span>
        </div>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-stone-800 p-2.5 rounded-full shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4 text-[#6B1D2F]" />
          </button>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between text-left">
        <div>
          {/* Fabric & Category Tag */}
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-1.5">
            <span className="text-[#6B1D2F] font-semibold tracking-wide uppercase text-[11px] bg-[#6B1D2F]/10 px-2 py-0.5 rounded">
              {product.fabric}
            </span>
            <span className="text-stone-400 capitalize">{product.categoryId.replace('-', ' ')}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="font-serif text-lg font-bold text-stone-900 line-clamp-1 group-hover:text-[#6B1D2F] transition-colors cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Price & MRP Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-[#6B1D2F]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-stone-400 line-through font-medium">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[11px] text-emerald-700 font-semibold ml-auto bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Budget Deal
            </span>
          </div>

          {/* Available Sizes Row */}
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Available Sizes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition-colors cursor-pointer ${selectedSize === size
                    ? 'bg-[#6B1D2F] text-white border-[#6B1D2F]'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Swatches Row */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                <span>Color Options:</span>
                <span className="text-stone-700 capitalize font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((colorObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(colorObj.name)}
                    title={colorObj.name}
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer relative flex items-center justify-center ${selectedColor === colorObj.name
                      ? 'scale-125 border-[#6B1D2F] ring-2 ring-[#D4AF37]/50'
                      : 'border-white ring-1 ring-stone-300 hover:scale-110'
                      }`}
                    style={{ backgroundColor: colorObj.hex }}
                  >
                    {selectedColor === colorObj.name && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${colorObj.hex.toLowerCase() === '#ffffff' ? 'bg-black' : 'bg-white'
                          }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Action Button */}
        <div className="pt-2 border-t border-stone-100">
          <WhatsAppButton
            productName={`${product.name} (Size: ${selectedSize || 'Standard'}, Color: ${selectedColor || 'Default'})`}
            phoneNumber="918087169690"
            label="Enquire on WhatsApp"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
