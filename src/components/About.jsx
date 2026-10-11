// src/components/About.jsx
import React from 'react';
import { Tag, Sparkles, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Tag,
      title: "Budget-Friendly Pricing",
      desc: "High fashion doesn't have to break the bank. Premium Indian ethnic wear priced honestly from ₹399 to ₹1299."
    },
    {
      icon: Sparkles,
      title: "Breathable & Rich Fabrics",
      desc: "Handpicked 100% Jaipur cottons, soft mulmul, and lustrous Chanderi silks tested for color fastness and durability."
    },
    {
      icon: Heart,
      title: "Designed for Every Body",
      desc: "Flattering cuts ranging from Medium to 2XL with generous seam margins for effortless comfort."
    },
    {
      icon: ShieldCheck,
      title: "Direct WhatsApp Ordering",
      desc: "No complicated signups or online payment carts. Speak directly with our team to inquire, confirm sizes, and order."
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#FAF6EE] relative overflow-hidden">
      {/* Decorative Floral/Gold Background motif accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6B1D2F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#4A101D] font-semibold text-xs uppercase tracking-widest bg-[#B89A8C]/25 px-4 py-1.5 rounded-full mb-3 border border-[#B89A8C]/40">
            <img src="/images/Flower.png" alt="Flower motif" className="w-4 h-4 object-contain inline-block" />
            <span>Our Story &bull; Where Elegance Blooms</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A101D] mb-3">
            Celebrating Grace, Affordability & Tradition
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
            <img src="/images/Flower.png" alt="Flower motif" className="w-6 h-6 object-contain" />
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
          </div>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            At <strong className="text-[#6B1D2F] font-semibold">Paaruni</strong>, we believe every woman deserves to look regal without overspending. We bring you curated Indian ethnic wear—from breezy short kurtis to opulent 3-piece festive suit sets—crafted with authentic Indian prints and premium fabrics at prices that delight.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-[#D4A96A]/60 transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#B89A8C]/20 group-hover:bg-[#4A101D] text-[#4A101D] group-hover:text-[#D4A96A] flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 group-hover:text-[#4A101D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Craftsmanship Banner */}
        <div className="bg-gradient-to-r from-[#4A101D] via-[#6B1D2F] to-[#5C232B] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-[#D4A96A]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[#D4A96A] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <img src="/images/Flower.png" alt="Flower motif" className="w-4 h-4 object-contain" />
                Why Paaruni Stands Out
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Quality Ethnic Wear Directly to Your Doorstep
              </h3>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light">
                We eliminate middleman markups so you get authentic Jaipuri prints, Chikankari embroidery, and Chanderi suits at direct-from-brand prices. Browse our catalogue, select your size, and tap "Enquire on WhatsApp" to connect with us instantly!
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A96A]" />
                  <span>No Online Registration Needed</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A96A]" />
                  <span>Personalized Size Assistance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="w-48 h-48 rounded-full border-2 border-[#D4A96A]/80 flex flex-col items-center justify-center text-center p-3 bg-[#FAF6EE] shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/Emblem.png"
                    alt="Paaruni Royal Emblem"
                    className="w-28 h-28 object-contain"
                  />
                  <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#4A101D] font-bold mt-1">
                    Paaruni Hallmark
                  </span>
                  <span className="text-[9px] font-serif italic text-[#D4A96A]">
                    Where elegance blooms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
