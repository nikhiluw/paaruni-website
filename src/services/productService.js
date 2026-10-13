// src/services/productService.js
// Service abstraction layer — fetches data from Supabase.
// All UI components query data exclusively through this service.

import { supabase, SUPABASE_URL } from '../lib/supabase';


const fixUrl = (u) =>
  typeof u === 'string' ? u.replace(/^https:\/\/[^/]+\.supabase\.co/, SUPABASE_URL) : u


// ─── PUBLIC QUERIES (used by storefront) ────────────────────

/**
 * Fetch all categories with active product count.
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
  const { data: cats, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (catError) {
    console.error('Error fetching categories:', catError);
    return [];
  }

  // Count active products per category
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('category_id')
    .eq('active', true);

  if (prodError) {
    console.error('Error fetching product counts:', prodError);
    return cats.map((c) => ({ ...c, count: 0 }));
  }

  return cats.map((cat) => ({
    ...cat,
    // Map snake_case DB field to camelCase for existing component compatibility
    coverImage: cat.cover_image,
    count: products.filter((p) => p.category_id === cat.id).length,
  }));
}

/**
 * Fetch a single category detail by its ID.
 * @param {string} categoryId
 * @returns {Promise<Object|null>}
 */
export async function getCategoryById(categoryId) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId)
    .eq('active', true);

  return { ...data, coverImage: data.cover_image, count: count || 0 };
}

/**
 * Fetch all active products belonging to a specific category.
 * @param {string} categoryId
 * @returns {Promise<Array>}
 */
export async function getProductsByCategory(categoryId) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data.map(mapProduct);
}

/**
 * Fetch a single active product by its unique product ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return mapProduct(data);
}

/**
 * Fetch featured products for showcase sections.
 * @returns {Promise<Array>}
 */
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data.map(mapProduct);
}

/**
 * Fetch all active products across all categories.
 * @returns {Promise<Array>}
 */
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data.map(mapProduct);
}

// ─── ADMIN QUERIES ──────────────────────────────────────────

/**
 * Fetch ALL products (including inactive) for admin management.
 * @returns {Promise<Array>}
 */
export async function getAllProductsAdmin() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin products:', error);
    return [];
  }

  return data.map(mapProduct);
}

/**
 * Fetch ALL categories for admin management.
 * @returns {Promise<Array>}
 */
export async function getAllCategoriesAdmin() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching admin categories:', error);
    return [];
  }

  return data.map((c) => ({ ...c, coverImage: c.cover_image }));
}

/**
 * Create a new product.
 * @param {Object} productData
 * @returns {Promise<Object>}
 */
export async function createProduct(productData) {
  const payload = mapProductToDB(productData);
  const { data, error } = await supabase
    .from('products')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return mapProduct(data);
}

/**
 * Update an existing product.
 * @param {string} id
 * @param {Object} productData
 * @returns {Promise<Object>}
 */
export async function updateProduct(id, productData) {
  const payload = mapProductToDB(productData);
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapProduct(data);
}

/**
 * Toggle a product's active status.
 * @param {string} id
 * @param {boolean} active
 * @returns {Promise<Object>}
 */
export async function toggleProductActive(id, active) {
  const { data, error } = await supabase
    .from('products')
    .update({ active })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapProduct(data);
}

/**
 * Delete a product permanently.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Create a new category.
 * @param {Object} categoryData
 * @returns {Promise<Object>}
 */
export async function createCategory(categoryData) {
  const payload = mapCategoryToDB(categoryData);
  const { data, error } = await supabase
    .from('categories')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return { ...data, coverImage: data.cover_image };
}

/**
 * Update an existing category.
 * @param {string} id
 * @param {Object} categoryData
 * @returns {Promise<Object>}
 */
export async function updateCategory(id, categoryData) {
  const payload = mapCategoryToDB(categoryData);
  const { data, error } = await supabase
    .from('categories')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return { ...data, coverImage: data.cover_image };
}

/**
 * Delete a category permanently.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ─── IMAGE UPLOAD ───────────────────────────────────────────

/**
 * Upload a product image to Supabase storage.
 * @param {File} file
 * @param {string} productId
 * @returns {Promise<string>} Public URL of the uploaded image
 */
export async function uploadProductImage(file, productId) {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = `products/${productId}/${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Delete a product image from Supabase storage.
 * @param {string} imageUrl - The full public URL of the image
 * @returns {Promise<void>}
 */
export async function deleteProductImage(imageUrl) {
  // Extract the storage path from the full URL
  const bucketPath = imageUrl.split('/product-images/')[1];
  if (!bucketPath) return; // External URL, nothing to delete

  const { error } = await supabase.storage
    .from('product-images')
    .remove([bucketPath]);

  if (error) throw error;
}

// ─── HELPERS (snake_case ↔ camelCase mapping) ───────────────

/**
 * Map a Supabase product row (snake_case) to the component shape (camelCase).
 */
function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    pieces: row.pieces,
    length: row.length,
    price: row.price,
    mrp: row.mrp,
    sizes: row.sizes || [],
    colors: row.colors || [],
    fabric: row.fabric,
    description: row.description,
    images: (row.images || []).map(fixUrl),
    featured: row.featured,
    active: row.active,
    createdAt: row.created_at,
  };
}

/**
 * Map a component product object (camelCase) to Supabase row shape (snake_case).
 */
function mapProductToDB(product) {
  const payload = {};
  if (product.id !== undefined) payload.id = product.id;
  if (product.name !== undefined) payload.name = product.name;
  if (product.categoryId !== undefined) payload.category_id = product.categoryId;
  if (product.pieces !== undefined) payload.pieces = product.pieces;
  if (product.length !== undefined) payload.length = product.length;
  if (product.price !== undefined) payload.price = product.price;
  if (product.mrp !== undefined) payload.mrp = product.mrp;
  if (product.sizes !== undefined) payload.sizes = product.sizes;
  if (product.colors !== undefined) payload.colors = product.colors;
  if (product.fabric !== undefined) payload.fabric = product.fabric;
  if (product.description !== undefined) payload.description = product.description;
  if (product.images !== undefined) payload.images = product.images;
  if (product.featured !== undefined) payload.featured = product.featured;
  if (product.active !== undefined) payload.active = product.active;
  return payload;
}

/**
 * Map a component category object (camelCase) to Supabase row shape (snake_case).
 */
function mapCategoryToDB(category) {
  const payload = {};
  if (category.id !== undefined) payload.id = category.id;
  if (category.name !== undefined) payload.name = category.name;
  if (category.tagline !== undefined) payload.tagline = category.tagline;
  if (category.description !== undefined) payload.description = category.description;
  if (category.coverImage !== undefined) payload.cover_image = category.coverImage;
  if (category.featured !== undefined) payload.featured = category.featured;
  if (category.sortOrder !== undefined) payload.sort_order = category.sortOrder;
  return payload;
}
