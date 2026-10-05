// src/components/WhatsAppButton.jsx
import React from 'react';

/**
 * WhatsApp Enquiry Button Component
 * Generates direct WhatsApp chat link with prefilled inquiry text.
 */
export default function WhatsAppButton({
  productName = '',
  phoneNumber = '918087169690', // Default placeholder phone number
  variant = 'primary', // 'primary', 'secondary', 'compact', 'floating'
  label = 'Enquire on WhatsApp',
  className = ''
}) {
  // Construct prefilled message text
  const messageText = productName
    ? `Hi Paaruni! I am interested in inquiring about "${productName}". Could you please share availability and details?`
    : `Hi Paaruni! I would like to enquire about your budget-friendly women's ethnic wear collection.`;

  const encodedMessage = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Base styling variants
  if (variant === 'floating') {
    return (
      <button
        onClick={handleWhatsAppClick}
        aria-label="Enquire on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-900/40 transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 group cursor-pointer ${className}`}
      >
        <svg
          className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 0C5.396 0 0 5.397 0 12.035c0 2.116.552 4.18 1.603 6.002L0 24l6.155-1.583A11.968 11.968 0 0012.031 24c6.634 0 12.032-5.397 12.032-12.035C24.063 5.397 18.665 0 12.031 0zm0 22.067c-1.848 0-3.66-.496-5.242-1.436l-.376-.223-3.896 1.022 1.04-3.797-.246-.39A9.99 9.99 0 012.003 12.035C2.003 6.501 6.5 2.003 12.031 2.003c5.531 0 10.029 4.498 10.029 10.032 0 5.534-4.498 10.032-10.029 10.032zm5.498-7.514c-.301-.151-1.782-.879-2.057-.979-.275-.101-.476-.151-.677.151-.201.301-.777.979-.953 1.18-.176.201-.352.226-.653.075-1.802-.903-2.981-1.608-4.17-3.649-.316-.543.316-.504.903-1.68.101-.201.05-.377-.025-.528-.075-.151-.677-1.631-.928-2.233-.244-.585-.494-.505-.677-.514-.176-.008-.377-.01-.577-.01s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.915 1.23 3.116.151.201 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.086 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352z" />
        </svg>
        <span className="font-semibold text-sm tracking-wide hidden sm:inline">Enquire on WhatsApp</span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#1E7E43] hover:text-white border border-[#25D366]/40 font-medium py-2.5 px-4 rounded-xl transition-all duration-300 text-sm group cursor-pointer ${className}`}
      >
        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12.031 0C5.396 0 0 5.397 0 12.035c0 2.116.552 4.18 1.603 6.002L0 24l6.155-1.583A11.968 11.968 0 0012.031 24c6.634 0 12.032-5.397 12.032-12.035C24.063 5.397 18.665 0 12.031 0zm0 22.067c-1.848 0-3.66-.496-5.242-1.436l-.376-.223-3.896 1.022 1.04-3.797-.246-.39A9.99 9.99 0 012.003 12.035C2.003 6.501 6.5 2.003 12.031 2.003c5.531 0 10.029 4.498 10.029 10.032 0 5.534-4.498 10.032-10.029 10.032zm5.498-7.514c-.301-.151-1.782-.879-2.057-.979-.275-.101-.476-.151-.677.151-.201.301-.777.979-.953 1.18-.176.201-.352.226-.653.075-1.802-.903-2.981-1.608-4.17-3.649-.316-.543.316-.504.903-1.68.101-.201.05-.377-.025-.528-.075-.151-.677-1.631-.928-2.233-.244-.585-.494-.505-.677-.514-.176-.008-.377-.01-.577-.01s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.915 1.23 3.116.151.201 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.086 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352z" />
        </svg>
        <span>{label}</span>
      </button>
    );
  }

  // Primary Default Variant
  return (
    <button
      onClick={handleWhatsAppClick}
      className={`w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1eb957] text-white font-medium py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all duration-200 text-sm group cursor-pointer ${className}`}
    >
      <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110 shrink-0" viewBox="0 0 24 24">
        <path d="M12.031 0C5.396 0 0 5.397 0 12.035c0 2.116.552 4.18 1.603 6.002L0 24l6.155-1.583A11.968 11.968 0 0012.031 24c6.634 0 12.032-5.397 12.032-12.035C24.063 5.397 18.665 0 12.031 0zm0 22.067c-1.848 0-3.66-.496-5.242-1.436l-.376-.223-3.896 1.022 1.04-3.797-.246-.39A9.99 9.99 0 012.003 12.035C2.003 6.501 6.5 2.003 12.031 2.003c5.531 0 10.029 4.498 10.029 10.032 0 5.534-4.498 10.032-10.029 10.032zm5.498-7.514c-.301-.151-1.782-.879-2.057-.979-.275-.101-.476-.151-.677.151-.201.301-.777.979-.953 1.18-.176.201-.352.226-.653.075-1.802-.903-2.981-1.608-4.17-3.649-.316-.543.316-.504.903-1.68.101-.201.05-.377-.025-.528-.075-.151-.677-1.631-.928-2.233-.244-.585-.494-.505-.677-.514-.176-.008-.377-.01-.577-.01s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.915 1.23 3.116.151.201 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.086 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352z" />
      </svg>
      <span className="truncate">{label}</span>
    </button>
  );
}
