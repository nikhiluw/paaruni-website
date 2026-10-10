// src/components/Contact.jsx
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Sparkles, CheckCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    categoryInterest: 'All Categories'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Send directly to WhatsApp
    const message = `Hi Paaruni! My name is ${formData.name} (${formData.phone}). I am interested in "${formData.categoryInterest}". Message: ${formData.message || 'I would like to inquire about your catalogue.'}`;
    const whatsappUrl = `https://wa.me/918087169690?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF6EE] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6B1D2F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#6B1D2F] font-semibold text-xs uppercase tracking-widest bg-[#6B1D2F]/10 px-4 py-1.5 rounded-full mb-3 border border-[#6B1D2F]/20">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A101D] mb-3">
            Contact Us & Orders
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
            <img src="/images/Flower.png" alt="Flower motif" className="w-6 h-6 object-contain" />
            <div className="w-14 h-[1px] bg-[#D4A96A]/60" />
          </div>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Have questions about sizes, fabric availability, or custom orders? Reach out to us directly via WhatsApp or fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Business Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Banner Card */}
            <div className="bg-[#6B1D2F] text-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/30 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest block mb-2">
                  Fastest Way To Order
                </span>
                <h3 className="font-serif text-2xl font-bold mb-3">
                  Direct WhatsApp Support
                </h3>
                <p className="text-stone-200 text-sm leading-relaxed mb-6 font-light">
                  Tap below to chat directly with our team on WhatsApp. Share product screenshots or ask size recommendations!
                </p>
                <WhatsAppButton
                  phoneNumber="918087169690"
                  label="Chat on WhatsApp (918087169690)"
                  variant="primary"
                />
              </div>
            </div>

            {/* Address & Info Card */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">Store Location</h4>
                  <p className="text-stone-600 text-sm leading-relaxed mt-1">
                    Paaruni Ethnic Wear Store, Main Market Road, Near City Center, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">Customer Care</h4>
                  <p className="text-stone-600 text-sm mt-1">+91 80871 69690 / +91 91XXXXXXXXXX</p>
                  <p className="text-stone-400 text-xs mt-0.5">Available 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">Email Inquiry</h4>
                  <p className="text-stone-600 text-sm mt-1">support@paaruni.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">Working Hours</h4>
                  <p className="text-stone-600 text-sm mt-1">Monday – Saturday: 10:00 AM to 8:30 PM</p>
                  <p className="text-stone-500 text-xs mt-0.5">Sunday: 11:00 AM to 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A101D] mb-2">
              Send Us a Quick Message
            </h3>
            <p className="text-stone-500 text-sm mb-8">
              Fill in your details below to open a pre-filled WhatsApp enquiry instantly.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-xl">Thank You!</h4>
                <p className="text-sm text-emerald-700">
                  Your inquiry message was prepared and opened in WhatsApp. We will assist you promptly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-emerald-800 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#6B1D2F] focus:ring-2 focus:ring-[#6B1D2F]/20 focus:outline-none text-stone-800 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#6B1D2F] focus:ring-2 focus:ring-[#6B1D2F]/20 focus:outline-none text-stone-800 text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Category of Interest
                  </label>
                  <select
                    value={formData.categoryInterest}
                    onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#6B1D2F] focus:ring-2 focus:ring-[#6B1D2F]/20 focus:outline-none text-stone-800 text-sm transition-all bg-white"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Long Kurti">Long Kurti</option>
                    <option value="Short Kurti">Short Kurti</option>
                    <option value="1 Piece Dress">1 Piece Dress</option>
                    <option value="2 Piece Set">2 Piece Set</option>
                    <option value="3 Piece Festive Suit">3 Piece Festive Suit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Your Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what design or size you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#6B1D2F] focus:ring-2 focus:ring-[#6B1D2F]/20 focus:outline-none text-stone-800 text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#6B1D2F] hover:bg-[#800020] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
