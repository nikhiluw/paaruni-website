// src/components/ProductModal.jsx
import React, { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';
import { X, Check, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');

  if (!product) return null;

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 relative">
              <img
                src={product.images?.[selectedImage] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#6B1D2F] text-[#F3DF8A] border border-[#D4AF37]/50 text-xs font-bold px-3 py-1 rounded-full">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx
                        ? 'border-[#6B1D2F] ring-2 ring-[#6B1D2F]/30 scale-105'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Specs */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B1D2F] uppercase tracking-wider mb-2">
                <span className="bg-[#6B1D2F]/10 px-2.5 py-0.5 rounded-md">
                  {product.fabric}
                </span>
                <span>&bull;</span>
                <span>{product.pieces} Piece Set</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-extrabold text-[#6B1D2F]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp && (
                  <span className="text-stone-400 line-through text-lg font-medium">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Best Price Offer
                </span>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Available Sizes */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Size: <span className="text-[#6B1D2F] font-bold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-[#6B1D2F]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Color: <span className="text-[#6B1D2F] capitalize">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'scale-110 border-[#6B1D2F] ring-2 ring-[#D4AF37]'
                            : 'border-white ring-1 ring-stone-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <WhatsAppButton
                productName={`${product.name} (Selected Size: ${selectedSize}, Color: ${selectedColor})`}
                phoneNumber="918087169690"
                label="Enquire on WhatsApp Now"
                variant="primary"
                className="py-3.5 text-base"
              />
              <p className="text-center text-xs text-stone-400">
                Direct WhatsApp assistance &bull; Free size advice &bull; Quality inspected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
