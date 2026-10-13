// src/components/admin/AdminLayout.jsx
// Shared layout for all admin pages — sidebar navigation + header.

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Store,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderOpen },
];

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  console.log(import.meta.env.VITE_SUPABASE_URL)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111010', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40,
            display: 'none',
          }}
          className="admin-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#1a1917',
          borderRight: '1px solid rgba(212,169,106,0.12)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-260px',
          bottom: 0,
          zIndex: 50,
          transition: 'left 0.3s ease',
        }}
        className="admin-sidebar"
      >
        {/* Logo area */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(212,169,106,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Store size={18} color="#1a1917" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ color: '#F2E6DE', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em' }}>Paaruni</div>
              <div style={{ color: 'rgba(184,137,90,0.6)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Panel</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="admin-sidebar-close"
            style={{
              background: 'none', border: 'none', color: '#B89A8C', cursor: 'pointer',
              display: 'none', padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 16px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#D4A96A' : '#B89A8C',
                background: isActive ? 'rgba(212,169,106,0.1)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <item.icon size={18} />
              {item.label}
              {/* Active indicator */}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(212,169,106,0.1)',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(184,137,90,0.5)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', color: '#B89A8C',
              cursor: 'pointer', fontSize: '0.85rem', padding: '8px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = '#D4A96A'}
            onMouseLeave={(e) => e.target.style.color = '#B89A8C'}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top bar */}
        <header style={{
          height: '60px',
          background: '#1a1917',
          borderBottom: '1px solid rgba(212,169,106,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '16px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="admin-menu-btn"
            style={{
              background: 'none', border: 'none', color: '#B89A8C', cursor: 'pointer',
              padding: '4px', display: 'none',
            }}
          >
            <Menu size={22} />
          </button>
          <NavLink
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'rgba(184,137,90,0.6)', fontSize: '0.8rem', textDecoration: 'none',
              transition: 'color 0.2s', marginLeft: 'auto',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D4A96A'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(184,137,90,0.6)'}
          >
            View Store <ChevronRight size={14} />
          </NavLink>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 769px) {
          .admin-sidebar { left: 0 !important; }
          .admin-main { margin-left: 260px; }
        }
        @media (max-width: 768px) {
          .admin-overlay { display: block !important; }
          .admin-sidebar-close { display: block !important; }
          .admin-menu-btn { display: block !important; }
          .admin-main { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}
