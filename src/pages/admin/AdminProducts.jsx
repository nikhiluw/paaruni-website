// src/pages/admin/AdminProducts.jsx
// Product list with search, filter, toggle active, and delete capabilities.

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllProductsAdmin,
  getAllCategoriesAdmin,
  toggleProductActive,
  deleteProduct,
} from '../../services/productService';
import {
  Plus, Search, Eye, EyeOff, Pencil, Trash2, Filter,
  ChevronDown, AlertTriangle,
} from 'lucide-react';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [actionLoading, setActionLoading] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prods, cats] = await Promise.all([
        getAllProductsAdmin(),
        getAllCategoriesAdmin(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (product) => {
    setActionLoading(product.id);
    try {
      const updated = await toggleProductActive(product.id, !product.active);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    } catch (err) {
      alert('Failed to toggle: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleDelete = async (product) => {
    setActionLoading(product.id);
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setDeleteModal(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && p.categoryId !== filterCategory) return false;
    if (filterStatus === 'active' && !p.active) return false;
    if (filterStatus === 'hidden' && p.active) return false;
    return true;
  });

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || id;

  const s = {
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '16px', marginBottom: '24px',
    },
    heading: {
      color: '#F2E6DE', fontSize: '1.6rem', fontWeight: 700,
      fontFamily: "'Playfair Display', serif",
    },
    addBtn: {
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '10px 20px', borderRadius: '10px',
      background: 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
      border: 'none', color: '#1a1917', fontSize: '0.85rem',
      fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    toolbar: {
      display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap',
    },
    searchWrap: {
      position: 'relative', flex: '1 1 200px',
    },
    searchInput: {
      width: '100%', padding: '10px 14px 10px 38px', borderRadius: '10px',
      border: '1px solid rgba(184,137,90,0.15)', background: '#1a1917',
      color: '#F2E6DE', fontSize: '0.85rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      outline: 'none', boxSizing: 'border-box',
    },
    searchIcon: {
      position: 'absolute', left: '12px', top: '50%',
      transform: 'translateY(-50%)', color: '#B89A8C',
    },
    select: {
      padding: '10px 14px', borderRadius: '10px',
      border: '1px solid rgba(184,137,90,0.15)', background: '#1a1917',
      color: '#B89A8C', fontSize: '0.85rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      outline: 'none', cursor: 'pointer', minWidth: '140px',
    },
    table: {
      width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px',
    },
    th: {
      textAlign: 'left', padding: '10px 16px', color: 'rgba(184,137,90,0.5)',
      fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em',
      fontWeight: 600,
    },
    td: {
      padding: '14px 16px', background: '#1a1917',
      color: '#F2E6DE', fontSize: '0.85rem',
    },
    thumbnail: {
      width: '44px', height: '44px', borderRadius: '8px',
      objectFit: 'cover', background: '#222',
    },
    badge: (active) => ({
      display: 'inline-flex', padding: '3px 10px', borderRadius: '20px',
      fontSize: '0.7rem', fontWeight: 600,
      background: active ? 'rgba(124,185,168,0.12)' : 'rgba(184,137,90,0.12)',
      color: active ? '#7CB9A8' : '#B89A8C',
    }),
    actionBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '6px', borderRadius: '6px', transition: 'background 0.2s',
    },
    // Delete modal
    modalOverlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '24px',
    },
    modal: {
      background: '#1a1917', borderRadius: '16px', padding: '32px',
      maxWidth: '400px', width: '100%',
      border: '1px solid rgba(212,169,106,0.1)',
    },
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.heading}>Products</h1>
        <Link to="/admin/products/new" style={s.addBtn}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <Search size={16} style={s.searchIcon} />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={s.select}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={s.select}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      {/* Count */}
      <div style={{ color: 'rgba(184,137,90,0.4)', fontSize: '0.8rem', marginBottom: '12px' }}>
        Showing {filtered.length} of {products.length} products
      </div>

      {loading ? (
        <div style={{ color: '#B89A8C', padding: '40px 0', textAlign: 'center' }}>Loading products…</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}></th>
                <th style={s.th}>Product</th>
                <th style={s.th}>Category</th>
                <th style={s.th}>Price</th>
                <th style={s.th}>Status</th>
                <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => (
                <tr key={product.id}>
                  <td style={{ ...s.td, borderRadius: '10px 0 0 10px', width: '60px' }}>
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" style={s.thumbnail} />
                    ) : (
                      <div style={{ ...s.thumbnail, background: '#2a2826', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.6rem', color: '#B89A8C' }}>No img</span>
                      </div>
                    )}
                  </td>
                  <td style={s.td}>
                    <div style={{ fontWeight: 600, marginBottom: '2px' }}>{product.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#B89A8C' }}>{product.id}</div>
                  </td>
                  <td style={s.td}>{getCategoryName(product.categoryId)}</td>
                  <td style={s.td}>
                    <span style={{ color: '#D4A96A', fontWeight: 600 }}>₹{product.price}</span>
                    {product.mrp > product.price && (
                      <span style={{ fontSize: '0.75rem', color: '#B89A8C', textDecoration: 'line-through', marginLeft: '6px' }}>
                        ₹{product.mrp}
                      </span>
                    )}
                  </td>
                  <td style={s.td}>
                    <span style={s.badge(product.active)}>
                      {product.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td style={{ ...s.td, borderRadius: '0 10px 10px 0', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                      <button
                        style={s.actionBtn}
                        title={product.active ? 'Hide product' : 'Show product'}
                        onClick={() => handleToggleActive(product)}
                        disabled={actionLoading === product.id}
                      >
                        {product.active
                          ? <EyeOff size={16} color="#B89A8C" />
                          : <Eye size={16} color="#7CB9A8" />}
                      </button>
                      <button
                        style={s.actionBtn}
                        title="Edit product"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                      >
                        <Pencil size={16} color="#D4A96A" />
                      </button>
                      <button
                        style={s.actionBtn}
                        title="Delete product"
                        onClick={() => setDeleteModal(product)}
                      >
                        <Trash2 size={16} color="#ff6b6b" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ ...s.td, textAlign: 'center', color: '#B89A8C', padding: '40px' }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteModal && (
        <div style={s.modalOverlay} onClick={() => setDeleteModal(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,107,107,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#ff6b6b" />
              </div>
              <div>
                <div style={{ color: '#F2E6DE', fontWeight: 700, fontSize: '1.1rem' }}>Delete Product</div>
                <div style={{ color: '#B89A8C', fontSize: '0.8rem' }}>This action cannot be undone</div>
              </div>
            </div>
            <p style={{ color: '#B89A8C', fontSize: '0.9rem', marginBottom: '24px' }}>
              Are you sure you want to permanently delete <strong style={{ color: '#F2E6DE' }}>{deleteModal.name}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteModal(null)}
                style={{
                  padding: '10px 20px', borderRadius: '10px', background: 'transparent',
                  border: '1px solid rgba(184,137,90,0.2)', color: '#B89A8C',
                  cursor: 'pointer', fontSize: '0.85rem',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                disabled={actionLoading === deleteModal.id}
                style={{
                  padding: '10px 20px', borderRadius: '10px', background: '#ff6b6b',
                  border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
                  fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {actionLoading === deleteModal.id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
