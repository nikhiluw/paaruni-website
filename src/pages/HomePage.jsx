// src/pages/HomePage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import About from '../components/About';
import CategoryGrid from '../components/CategoryGrid';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductModal from '../components/ProductModal';

export default function HomePage() {
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-stone-800 flex flex-col font-sans">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 1: Home (Hero Slider) */}
        <HeroSlider />

        {/* Section 2: About Us */}
        <About />

        {/* Section 3: Products (Category Grid) */}
        <CategoryGrid />

        {/* Section 4: Contact Us */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Floating WhatsApp Quick Button */}
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
