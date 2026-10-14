// src/pages/admin/AdminProductForm.jsx
// Full product form — used for both creating and editing products.

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import {
  getProduct,
  createProduct,
  updateProduct,
  getAllCategoriesAdmin,
  uploadProductImage,
} from '../../services/productService';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];



const emptyProduct = {
  id: '',
  name: '',
  categoryId: '',
  pieces: 1,
  length: 'long',
  price: '',
  mrp: '',
  sizes: ['M', 'L', 'XL', 'XXL'],
  colors: [],
  fabric: '',
  description: '',
  images: [],
  featured: false,
  active: true,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...emptyProduct });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPieces, setShowPieces] = useState(false);

  // Color picker temp state
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#D4A96A');

  useEffect(() => {
    loadCategories();
    if (isEditing) loadProduct();
  }, [id]);

  const loadCategories = async () => {
    const cats = await getAllCategoriesAdmin();
    setCategories(cats);
    const selectedCategory = cats.find((c) => c.id === form.categoryId);
    setShowPieces(selectedCategory ? selectedCategory.usesPieces !== false : true);

  };

  const loadProduct = async () => {
    try {
      const product = await getProduct(id);
      if (product) {
        setForm({
          ...product,
          price: product.price.toString(),
          mrp: product.mrp.toString(),
        });
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === 'categoryId') {
      const selectedCategory = categories.find((category) => category.id === value);
      setShowPieces(selectedCategory ? selectedCategory.usesPieces !== false : true);
    }
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    if (!newColorName.trim()) return;
    setForm((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }],
    }));
    setNewColorName('');
    setNewColorHex('#D4A96A');
  };

  const removeColor = (index) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const price = parseInt(form.price, 10);
      let mrp = parseInt(form.mrp, 10);

      if (!Number.isNaN(mrp) && mrp < price) {
        setError('MRP cannot be lower than the sale price');
        setSaving(false);
        return;
      }
      if (Number.isNaN(mrp)) mrp = price;   // no MRP entered, so no discount

      const payload = {
        ...form,
        price,
        mrp,
        pieces: showPieces ? parseInt(form.pieces, 10) : null,
      };

      if (isEditing) {
        await updateProduct(id, payload);
      } else {
        if (!payload.id) {
          setError('Product ID is required');
          setSaving(false);
          return;
        }
        await createProduct(payload);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  // Shared input styles
  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1px solid rgba(184,137,90,0.2)', background: 'rgba(0,0,0,0.3)',
    color: '#F2E6DE', fontSize: '0.9rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block', color: '#B89A8C', fontSize: '0.8rem',
    fontWeight: 500, marginBottom: '6px',
  };

  const sectionStyle = {
    background: '#1a1917', borderRadius: '16px',
    padding: '24px', marginBottom: '20px',
    border: '1px solid rgba(212,169,106,0.08)',
  };

  const sectionTitle = {
    color: '#D4A96A', fontSize: '0.75rem', textTransform: 'uppercase',
    letterSpacing: '0.08em', fontWeight: 600, marginBottom: '20px',
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ color: '#B89A8C', padding: '40px 0', textAlign: 'center' }}>Loading…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <button
          onClick={() => navigate('/admin/products')}
          style={{
            background: 'none', border: 'none', color: '#B89A8C',
            cursor: 'pointer', padding: '4px',
          }}
        >
          <ArrowLeft size={22} />
        </button>
        <h1 style={{
          color: '#F2E6DE', fontSize: '1.4rem', fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
        }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
          borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
          color: '#ff6b6b', fontSize: '0.85rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="admin-form-grid">
          {/* Left column */}
          <div>
            {/* Basic info */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Basic Information</div>

              {!isEditing && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Product ID *</label>
                  <input
                    type="text"
                    value={form.id}
                    onChange={(e) => handleChange('id', e.target.value)}
                    placeholder="e.g. lk-105"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                  />
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Chanderi Floral Printed Long Kurti"
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Category *</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => handleChange('categoryId', e.target.value)}
                  required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">Select category…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: showPieces ? '1fr 1fr' : '1fr', gap: '12px', marginBottom: '16px' }}>
                {showPieces && (
                  <div>
                    <label style={labelStyle}>Pieces</label>
                    <select
                      value={form.pieces}
                      onChange={(e) => handleChange('pieces', e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value={1}>1 Piece</option>
                      <option value={2}>2 Piece</option>
                      <option value={3}>3 Piece</option>
                    </select>
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Length</label>
                  <select
                    value={form.length}
                    onChange={(e) => handleChange('length', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Fabric</label>
                <input
                  type="text"
                  value={form.fabric}
                  onChange={(e) => handleChange('fabric', e.target.value)}
                  placeholder="e.g. Pure Cotton Slub"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                />
              </div>
            </div>

            {/* Pricing */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Pricing</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Sale Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="699"
                    required
                    min="0"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>MRP (₹) *</label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={(e) => handleChange('mrp', e.target.value)}
                    placeholder="1299"
                    required
                    min="0"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                  />
                </div>
              </div>
              {form.price && form.mrp && parseInt(form.mrp) > parseInt(form.price) && (
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#7CB9A8' }}>
                  Discount: {Math.round((1 - parseInt(form.price) / parseInt(form.mrp)) * 100)}% off
                </div>
              )}
            </div>

            {/* Description */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Description</div>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Write a detailed product description…"
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
              />
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Images */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Product Images</div>
              <ImageUploader
                images={form.images}
                onChange={(imgs) => handleChange('images', imgs)}
                productId={form.id || 'temp'}
                onUpload={uploadProductImage}
              />
            </div>

            {/* Sizes */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Available Sizes</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {AVAILABLE_SIZES.map((size) => {
                  const selected = form.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      style={{
                        padding: '8px 16px', borderRadius: '8px',
                        border: `1px solid ${selected ? '#D4A96A' : 'rgba(184,137,90,0.15)'}`,
                        background: selected ? 'rgba(212,169,106,0.1)' : 'transparent',
                        color: selected ? '#D4A96A' : '#B89A8C',
                        cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'all 0.2s',
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Color Options</div>

              {/* Existing colors */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: form.colors.length > 0 ? '16px' : '0' }}>
                {form.colors.map((color, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '6px 12px', borderRadius: '20px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(184,137,90,0.15)',
                  }}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: color.hex, border: '1px solid rgba(255,255,255,0.1)',
                    }} />
                    <span style={{ color: '#F2E6DE', fontSize: '0.8rem' }}>{color.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(i)}
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '2px' }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add new color */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Color Name</label>
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="e.g. Royal Maroon"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#D4A96A'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(184,137,90,0.2)'}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addColor(); } }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Hex</label>
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    style={{
                      width: '44px', height: '42px', borderRadius: '10px',
                      border: '1px solid rgba(184,137,90,0.2)', background: 'none',
                      cursor: 'pointer', padding: '2px',
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={addColor}
                  style={{
                    padding: '10px 14px', borderRadius: '10px',
                    background: 'rgba(212,169,106,0.15)', border: '1px solid rgba(212,169,106,0.2)',
                    color: '#D4A96A', cursor: 'pointer', height: '42px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.8rem', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div style={sectionStyle}>
              <div style={sectionTitle}>Visibility</div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F2E6DE', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    style={{ accentColor: '#D4A96A', width: '18px', height: '18px' }}
                  />
                  Featured
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F2E6DE', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => handleChange('active', e.target.checked)}
                    style={{ accentColor: '#7CB9A8', width: '18px', height: '18px' }}
                  />
                  Active (visible on store)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            style={{
              padding: '12px 24px', borderRadius: '10px', background: 'transparent',
              border: '1px solid rgba(184,137,90,0.2)', color: '#B89A8C',
              cursor: 'pointer', fontSize: '0.9rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 28px', borderRadius: '10px',
              background: saving
                ? 'rgba(212,169,106,0.4)'
                : 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
              border: 'none', color: '#1a1917', fontSize: '0.9rem',
              fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Save size={16} />
            {saving ? 'Saving…' : isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>

      <style>{`
        @media (max-width: 768px) {
          .admin-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
}
