// src/components/admin/ImageUploader.jsx
// Multi-image uploader with preview, drag-and-drop, and delete.

import React, { useRef, useState } from 'react';
import { Upload, X, GripVertical, ImagePlus } from 'lucide-react';

export default function ImageUploader({ images = [], onChange, productId, onUpload }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;

    setUploading(true);
    try {
      const newUrls = [];
      for (const file of files) {
        if (onUpload) {
          const url = await onUpload(file, productId);
          newUrls.push(url);
        } else {
          // Fallback: create object URL for preview (no actual upload)
          newUrls.push(URL.createObjectURL(file));
        }
      }
      onChange([...images, ...newUrls]);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveImage = (from, to) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  const styles = {
    container: {
      marginBottom: '8px',
    },
    dropZone: {
      border: `2px dashed ${dragOver ? '#D4A96A' : 'rgba(184,137,90,0.25)'}`,
      borderRadius: '12px',
      padding: '32px 24px',
      textAlign: 'center',
      cursor: 'pointer',
      background: dragOver ? 'rgba(212,169,106,0.05)' : 'transparent',
      transition: 'all 0.2s ease',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: '12px',
      marginTop: '16px',
    },
    imageCard: {
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#1a1917',
      border: '1px solid rgba(184,137,90,0.15)',
      aspectRatio: '1',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    removeBtn: {
      position: 'absolute',
      top: '6px',
      right: '6px',
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.7)',
      border: 'none',
      color: '#ff6b6b',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s',
    },
    orderBtns: {
      position: 'absolute',
      bottom: '6px',
      left: '6px',
      display: 'flex',
      gap: '4px',
    },
    orderBtn: {
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      background: 'rgba(0,0,0,0.65)',
      border: 'none',
      color: '#D4A96A',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 700,
    },
    primaryBadge: {
      position: 'absolute',
      top: '6px',
      left: '6px',
      background: '#D4A96A',
      color: '#1a1917',
      fontSize: '0.6rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      padding: '2px 8px',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Drop zone */}
      <div
        style={styles.dropZone}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div style={{ color: '#D4A96A' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 8px' }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
            </svg>
            <div>Uploading…</div>
          </div>
        ) : (
          <>
            <ImagePlus size={28} color="#B89A8C" style={{ margin: '0 auto 8px' }} />
            <div style={{ color: '#B89A8C', fontSize: '0.9rem' }}>
              Drop images here or <span style={{ color: '#D4A96A', fontWeight: 600 }}>click to browse</span>
            </div>
            <div style={{ color: 'rgba(184,137,90,0.4)', fontSize: '0.75rem', marginTop: '4px' }}>
              PNG, JPG, WebP — up to 5MB each
            </div>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />

      {/* Image grid */}
      {images.length > 0 && (
        <div style={styles.grid}>
          {images.map((url, i) => (
            <div key={i} style={styles.imageCard}>
              <img src={url} alt={`Product image ${i + 1}`} style={styles.img} />
              {i === 0 && <span style={styles.primaryBadge}>Primary</span>}
              <button
                onClick={() => removeImage(i)}
                style={styles.removeBtn}
                title="Remove image"
              >
                <X size={14} />
              </button>
              <div style={styles.orderBtns}>
                {i > 0 && (
                  <button onClick={() => moveImage(i, i - 1)} style={styles.orderBtn} title="Move left">
                    ←
                  </button>
                )}
                {i < images.length - 1 && (
                  <button onClick={() => moveImage(i, i + 1)} style={styles.orderBtn} title="Move right">
                    →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
