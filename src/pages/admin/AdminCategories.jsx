// src/pages/admin/AdminCategories.jsx
// Category management with inline add/edit/delete.

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/productService';
import {
  Plus, Pencil, Trash2, Save, X, AlertTriangle, GripVertical,
} from 'lucide-react';

const emptyCategory = {
  id: '',
  name: '',
  tagline: '',
  description: '',
  coverImage: '',
  featured: true,
  sortOrder: 0,
  usesPieces: true,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyCategory });
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await getAllCategoriesAdmin();
      setCategories(cats);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      id: cat.id,
      name: cat.name,
      tagline: cat.tagline || '',
      description: cat.description || '',
      coverImage: cat.coverImage || cat.cover_image || '',
      featured: cat.featured,
      sortOrder: cat.sort_order || 0,
      usesPieces: cat.usesPieces !== false,
    });
    setIsNew(false);
    setError('');
  };

  const startNew = () => {
    setEditingId('__new__');
    setForm({ ...emptyCategory, sortOrder: categories.length + 1 });
    setIsNew(true);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyCategory });
    setIsNew(false);
    setError('');
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Category name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (isNew) {
        if (!form.id.trim()) {
          setError('Category ID is required (e.g. "long-kurti")');
          setSaving(false);
          return;
        }
        const created = await createCategory(form);
        setCategories((prev) => [...prev, created]);
      } else {
        const updated = await updateCategory(editingId, form);
        setCategories((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
      }
      cancelEdit();
    } catch (err) {
      setError(err.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    setSaving(true);
    try {
      await deleteCategory(cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      setDeleteModal(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

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
      fontWeight: 700, cursor: 'pointer',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    card: {
      background: '#1a1917', borderRadius: '14px',
      border: '1px solid rgba(212,169,106,0.08)',
      marginBottom: '12px', overflow: 'hidden',
    },
    cardRow: {
      display: 'flex', alignItems: 'center', gap: '16px',
      padding: '16px 20px',
    },
    thumbnail: {
      width: '56px', height: '56px', borderRadius: '10px',
      objectFit: 'cover', background: '#222', flexShrink: 0,
    },
    cardInfo: {
      flex: 1, minWidth: 0,
    },
    cardName: {
      color: '#F2E6DE', fontWeight: 600, fontSize: '1rem',
      marginBottom: '2px',
    },
    cardMeta: {
      color: '#B89A8C', fontSize: '0.8rem',
    },
    cardActions: {
      display: 'flex', gap: '4px', flexShrink: 0,
    },
    actionBtn: {
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '6px', borderRadius: '6px', transition: 'background 0.2s',
    },
    editForm: {
      padding: '20px', borderTop: '1px solid rgba(212,169,106,0.08)',
      background: 'rgba(0,0,0,0.15)',
    },
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
        <h1 style={s.heading}>Categories</h1>
        {!isNew && (
          <button onClick={startNew} style={s.addBtn}>
            <Plus size={16} /> Add Category
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ color: '#B89A8C', padding: '40px 0', textAlign: 'center' }}>Loading categories…</div>
      ) : (
        <div>
          {/* New category form */}
          {isNew && (
            <div style={{ ...s.card, border: '1px solid rgba(212,169,106,0.2)' }}>
              <div style={s.editForm}>
                <div style={{ marginBottom: '12px', color: '#D4A96A', fontWeight: 600, fontSize: '0.9rem' }}>
                  New Category
                </div>

                {error && (
                  <div style={{
                    background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
                    borderRadius: '8px', padding: '8px 12px', marginBottom: '12px',
                    color: '#ff6b6b', fontSize: '0.8rem',
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={labelStyle}>Category ID *</label>
                    <input
                      type="text"
                      value={form.id}
                      onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                      placeholder="e.g. long-kurti"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Long Kurti"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Tagline</label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                    placeholder="e.g. Graceful & Elegant Daily Wear"
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Category description…"
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Cover Image URL</label>
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </div>

                <label style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#F2E6DE', cursor: 'pointer', fontSize: '0.85rem',
                  marginBottom: '16px',
                }}>
                  <input
                    type="checkbox"
                    checked={form.usesPieces}
                    onChange={(e) => setForm((p) => ({ ...p, usesPieces: e.target.checked }))}
                    style={{ accentColor: '#D4A96A', width: '18px', height: '18px' }}
                  />
                  Products here are sold as 1 / 2 / 3 piece sets
                </label>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button onClick={cancelEdit} style={{
                    padding: '8px 16px', borderRadius: '8px', background: 'transparent',
                    border: '1px solid rgba(184,137,90,0.2)', color: '#B89A8C',
                    cursor: 'pointer', fontSize: '0.85rem',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} style={{
                    padding: '8px 16px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
                    border: 'none', color: '#1a1917', fontSize: '0.85rem',
                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    <Save size={14} /> {saving ? 'Saving…' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category list */}
          {categories.map((cat) => (
            <div key={cat.id} style={s.card}>
              <div style={s.cardRow}>
                {(cat.coverImage || cat.cover_image) ? (
                  <img src={cat.coverImage || cat.cover_image} alt="" style={s.thumbnail} />
                ) : (
                  <div style={{ ...s.thumbnail, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2a2826' }}>
                    <span style={{ fontSize: '0.5rem', color: '#B89A8C' }}>No img</span>
                  </div>
                )}
                <div style={s.cardInfo}>
                  <div style={s.cardName}>{cat.name}</div>
                  <div style={s.cardMeta}>
                    {cat.tagline} · ID: {cat.id}
                  </div>
                </div>
                <div style={s.cardActions}>
                  <button
                    style={s.actionBtn}
                    title="Edit category"
                    onClick={() => startEdit(cat)}
                  >
                    <Pencil size={16} color="#D4A96A" />
                  </button>
                  <button
                    style={s.actionBtn}
                    title="Delete category"
                    onClick={() => setDeleteModal(cat)}
                  >
                    <Trash2 size={16} color="#ff6b6b" />
                  </button>
                </div>
              </div>

              {/* Inline edit form */}
              {editingId === cat.id && (
                <div style={s.editForm}>
                  {error && (
                    <div style={{
                      background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)',
                      borderRadius: '8px', padding: '8px 12px', marginBottom: '12px',
                      color: '#ff6b6b', fontSize: '0.8rem',
                    }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Tagline</label>
                      <input
                        type="text"
                        value={form.tagline}
                        onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={labelStyle}>Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Cover Image URL</label>
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>

                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: '#F2E6DE', cursor: 'pointer', fontSize: '0.85rem',
                    marginBottom: '16px',
                  }}>
                    <input
                      type="checkbox"
                      checked={form.usesPieces}
                      onChange={(e) => setForm((p) => ({ ...p, usesPieces: e.target.checked }))}
                      style={{ accentColor: '#D4A96A', width: '18px', height: '18px' }}
                    />
                    Products here are sold as 1 / 2 / 3 piece sets
                  </label>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={cancelEdit} style={{
                      padding: '8px 16px', borderRadius: '8px', background: 'transparent',
                      border: '1px solid rgba(184,137,90,0.2)', color: '#B89A8C',
                      cursor: 'pointer', fontSize: '0.85rem',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} style={{
                      padding: '8px 16px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #D4A96A 0%, #B8895A 100%)',
                      border: 'none', color: '#1a1917', fontSize: '0.85rem',
                      fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      <Save size={14} /> {saving ? 'Saving…' : 'Update'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {categories.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '40px', color: '#B89A8C',
              background: '#1a1917', borderRadius: '14px',
              border: '1px solid rgba(212,169,106,0.08)',
            }}>
              No categories yet. Click "Add Category" to create one.
            </div>
          )}
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
                <div style={{ color: '#F2E6DE', fontWeight: 700, fontSize: '1.1rem' }}>Delete Category</div>
                <div style={{ color: '#B89A8C', fontSize: '0.8rem' }}>This will also delete all products in this category</div>
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
                disabled={saving}
                style={{
                  padding: '10px 20px', borderRadius: '10px', background: '#ff6b6b',
                  border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
                  fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {saving ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
