// src/components/Footer.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, PhoneCall, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    navigate('/', { replace: false });
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCategoryNav = (catId) => {
    navigate(`/products/${catId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-[#4A101D] text-stone-300 pt-16 pb-8 border-t border-[#D4AF37]/30 relative z-10"
      style={{ backgroundColor: '#4A101D' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-700/60">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800020] flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold border border-[#D4AF37]/40 shadow-inner">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-extrabold tracking-wider text-white leading-none">
                  PAARUNI
                </span>
                <span className="text-[11px] font-serif italic text-[#D4AF37] tracking-wider mt-1">
                  Where elegance blooms
                </span>
              </div>
            </div>
            <p className="text-stone-300 text-sm font-light leading-relaxed max-w-sm">
              <em className="text-[#F3DF8A] not-italic font-serif italic">Where elegance blooms.</em> Paaruni is your destination for budget-friendly women's ethnic wear—from daily casual kurtis to festive 3-piece ensembles.
            </p>
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-semibold bg-[#800020] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct WhatsApp Catalogue &bull; No Hidden Fees</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-serif text-[#D4AF37] font-bold text-base uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Home & Hero Slider
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  About Us & Quality Promise
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('products')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Categories Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Contact Us & Store Location
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-serif text-[#D4AF37] font-bold text-base uppercase tracking-wider mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryNav('long-kurti')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Long Kurti
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('short-kurti')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Short Kurti
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('1-piece')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  1 Piece Ethnic Dress
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('2-piece')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  2 Piece Kurti & Bottom
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('3-piece')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  3 Piece Festive Suit Set
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Helpline */}
          <div className="lg:col-span-2 text-left space-y-3">
            <h4 className="font-serif text-[#D4AF37] font-bold text-base uppercase tracking-wider mb-4">
              WhatsApp Order
            </h4>
            <p className="text-xs text-stone-300">
              Need assistance? Connect with us on WhatsApp instantly:
            </p>
            <a
              href="https://wa.me/918087169690?text=Hi%20Paaruni!%20I%20have%20a%20question%20regarding%20your%20ethnic%20wear."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:bg-[#20ba5a] transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+91 80871 69690</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Paaruni Ethnic Wear. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-current inline" />
            <span>for Budget-Friendly Fashion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
