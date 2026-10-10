// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Products', sectionId: 'products' },
    { label: 'Contact Us', sectionId: 'contact' },
  ];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-[#B89A8C] text-[#F2E6DE] text-xs font-medium tracking-widest py-2 px-4 text-center border-b border-[#D4A96A]/40 flex items-center justify-center gap-2 sm:gap-3">
        <img src="/images/Flower.png" alt="Flower motif" className="w-3.5 h-3.5 object-contain inline-block" />
        <span>BUDGET-FRIENDLY WOMEN'S ETHNIC WEAR &bull; WHERE ELEGANCE BLOOMS</span>
        <img src="/images/Flower.png" alt="Flower motif" className="w-3.5 h-3.5 object-contain inline-block" />
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6EE]/95 backdrop-blur-md shadow-lg border-b border-[#D4A96A]/30 py-3'
            : 'bg-[#FAF6EE] py-4 border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Authentic Emblem */}
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-[#B89A8C]/20 border border-[#D4A96A] shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
              <img
                src="/images/Emblem.png"
                alt="Paaruni Royal Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-[#4A101D] group-hover:text-[#6B1D2F] transition-colors leading-none">
                  PAARUNI
                </span>
                <img
                  src="/images/Flower.png"
                  alt="Flower"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain inline-block transform -rotate-12 group-hover:rotate-12 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#D4A96A] font-semibold font-serif italic mt-0.5">
                Where elegance blooms
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-stone-700 hover:text-[#4A101D] font-medium text-sm tracking-wide uppercase transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4A96A] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/918087169690?text=Hi%20Paaruni!%20I%20would%20like%20to%20enquire%20about%20your%20ethnic%20wear%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#4A101D] hover:bg-[#6B1D2F] text-[#F2E6DE] text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#D4A96A]/50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4A96A]" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-[#4A101D] hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6EE] border-b border-[#D4A96A]/30 shadow-xl px-4 pt-3 pb-6 animate-fade-in">
            {/* Mobile Brand Card */}
            <div className="bg-[#B89A8C] p-3 rounded-2xl flex items-center justify-center border border-[#D4A96A]/40 mb-3 shadow-sm">
              <img
                src="/images/Logo3_web.png"
                alt="Paaruni Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="text-left font-serif text-stone-800 hover:text-[#4A101D] font-semibold text-lg py-2 border-b border-stone-200/60 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <a
                  href="https://wa.me/918087169690?text=Hi%20Paaruni!%20I%20would%20like%20to%20enquire%20about%20your%20ethnic%20wear%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Enquire on WhatsApp (918087169690)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
