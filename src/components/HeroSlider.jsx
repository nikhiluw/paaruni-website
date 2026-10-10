// src/components/HeroSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
      badge: "Festive Collection 2026",
      title: "Where Elegance Blooms",
      subtitle: "Discover handcrafted Long Kurtis, 2-Piece Co-ords & 3-Piece Festive Suits crafted for every Indian woman.",
      priceTag: "Kurtis starting from ₹399",
      cta: "Explore Categories",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1600&auto=format&fit=crop",
      badge: "Pure Cotton Comfort",
      title: "Graceful Everyday & Work Wear",
      subtitle: "Breathable Jaipur cottons, rich Chanderi weaves, and daily short kurtis that blend style with comfort.",
      priceTag: "Complete Suits under ₹1299",
      cta: "View Products",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=1600&auto=format&fit=crop",
      badge: "Exclusive 3-Piece Sets",
      title: "Royal Anarkalis & Festive Sets",
      subtitle: "Effortless direct WhatsApp ordering, premium fabrics, and tailored fits for your special celebrations.",
      priceTag: "Zero Hassle & Direct Order",
      cta: "Browse Catalogue",
    }
  ];

  const handleScrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full bg-stone-900 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-[540px] sm:h-[620px] lg:h-[680px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Dark Vignette Gradient */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                loading="eager"
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3B0E17]/90 via-[#6B1D2F]/75 to-black/60" />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-12 lg:px-16 flex flex-col justify-center text-left">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* Brand Tagline & Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 bg-[#D4A96A]/25 border border-[#D4A96A]/60 text-[#F2E6DE] text-xs sm:text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-[#D4A96A]" />
                    <span>{slide.badge}</span>
                  </div>
                  <span className="font-serif italic text-[#F2E6DE] text-xs sm:text-sm tracking-wider bg-black/45 px-3.5 py-1.5 rounded-full border border-[#D4A96A]/40 backdrop-blur-sm inline-flex items-center gap-2">
                    <img src="/images/Flower.png" alt="Flower motif" className="w-4 h-4 object-contain inline-block" />
                    <span>Where elegance blooms</span>
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-stone-200 text-base sm:text-xl font-light leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Price tag highlight & CTA */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleScrollToProducts}
                    className="inline-flex items-center gap-3 bg-[#D4A96A] hover:bg-[#c59858] text-[#4A101D] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="inline-flex items-center gap-2 text-[#F2E6DE] font-medium text-sm bg-black/40 px-4 py-3 rounded-full border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{slide.priceTag}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Feature Highlight Strip below Slider */}
      <div className="bg-[#4A101D] border-t border-[#D4A96A]/30 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-[#F2E6DE] text-xs sm:text-sm text-center">
          <div className="flex items-center justify-center gap-2.5">
            <img src="/images/Emblem.png" alt="Emblem" className="w-5 h-5 rounded-full object-contain bg-white/20 p-0.5 border border-[#D4A96A]" />
            <span>100% Quality Fabric Guaranteed</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#D4A96A]" />
            <span>Budget-Friendly Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/images/Flower.png" alt="Flower motif" className="w-4 h-4 object-contain inline-block" />
            <span>Sizes M to 2XL Available</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ArrowRight className="w-4 h-4 text-[#D4A96A]" />
            <span>Quick WhatsApp Inquiry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
