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
      <div className="bg-[#800020] text-[#FAF6EE] text-xs font-medium tracking-widest py-2 px-4 text-center border-b border-[#D4AF37]/30 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>BUDGET-FRIENDLY WOMEN'S ETHNIC WEAR &bull; DIRECT WHATSAPP ORDERING</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6EE]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20 py-3'
            : 'bg-[#FAF6EE] py-4 border-b border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#800020] flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#D4AF37]/40">
              P
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-[#800020] group-hover:text-[#6B1D2F] transition-colors leading-none">
                PAARUNI
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D4AF37] font-medium font-serif italic mt-0.5">
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
                className="text-stone-700 hover:text-[#800020] font-medium text-sm tracking-wide uppercase transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
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
              className="flex items-center gap-2 bg-[#800020] hover:bg-[#6B1D2F] text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#D4AF37]/30"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-[#800020] hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6EE] border-b border-[#D4AF37]/20 shadow-xl px-4 pt-3 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="text-left font-serif text-stone-800 hover:text-[#800020] font-semibold text-lg py-2 border-b border-stone-200/60 transition-colors cursor-pointer"
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
