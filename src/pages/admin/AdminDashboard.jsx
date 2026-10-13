// src/pages/admin/AdminDashboard.jsx
// Overview dashboard showing key stats: total products, categories, featured, hidden.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProductsAdmin, getAllCategoriesAdmin } from '../../services/productService';
import { Package, FolderOpen, Star, EyeOff, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, featured: 0, hidden: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, categories] = await Promise.all([
        getAllProductsAdmin(),
        getAllCategoriesAdmin(),
      ]);
      setStats({
        products: products.length,
        categories: categories.length,
        featured: products.filter((p) => p.featured).length,
        hidden: products.filter((p) => !p.active).length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: '#D4A96A', link: '/admin/products' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, color: '#7CB9A8', link: '/admin/categories' },
    { label: 'Featured', value: stats.featured, icon: Star, color: '#E5A93B', link: '/admin/products' },
    { label: 'Hidden', value: stats.hidden, icon: EyeOff, color: '#B89A8C', link: '/admin/products' },
  ];

  const s = {
    heading: {
      color: '#F2E6DE', fontSize: '1.6rem', fontWeight: 700,
      fontFamily: "'Playfair Display', serif", marginBottom: '8px',
    },
    subheading: {
      color: 'rgba(184,137,90,0.5)', fontSize: '0.85rem', marginBottom: '32px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    },
    card: (color) => ({
      background: '#1a1917',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(212,169,106,0.08)',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'block',
    }),
    cardIcon: (color) => ({
      width: '42px', height: '42px', borderRadius: '12px',
      background: `${color}15`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '16px',
    }),
    cardValue: {
      color: '#F2E6DE', fontSize: '2rem', fontWeight: 700, lineHeight: 1,
      marginBottom: '4px',
    },
    cardLabel: {
      color: '#B89A8C', fontSize: '0.85rem', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
    },
  };

  return (
    <AdminLayout>
      <h1 style={s.heading}>Dashboard</h1>
      <p style={s.subheading}>Welcome back. Here's an overview of your store.</p>

      {loading ? (
        <div style={{ color: '#B89A8C', padding: '40px 0', textAlign: 'center' }}>
          Loading stats…
        </div>
      ) : (
        <div style={s.grid}>
          {cards.map((card) => (
            <Link key={card.label} to={card.link} style={s.card(card.color)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${card.color}30`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,169,106,0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={s.cardIcon(card.color)}>
                <card.icon size={20} color={card.color} />
              </div>
              <div style={s.cardValue}>{card.value}</div>
              <div style={s.cardLabel}>
                {card.label}
                <ArrowUpRight size={14} color="rgba(184,137,90,0.3)" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
