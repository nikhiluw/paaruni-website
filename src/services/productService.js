// src/services/productService.js
// Service abstraction layer for fetching products and categories.
// All UI components query data exclusively through this service.

import { categories, products } from '../data/products';

/**
 * Fetch all available categories with active product count.
 * @returns {Promise<Array>} List of categories
 */
export async function getCategories() {
  // Simulating async behavior for easy future Supabase / API replacement
  return new Promise((resolve) => {
    setTimeout(() => {
      const activeProducts = products.filter((p) => p.active);
      const categoriesWithCount = categories.map((cat) => {
        const count = activeProducts.filter((p) => p.categoryId === cat.id).length;
        return {
          ...cat,
          count
        };
      });
      resolve(categoriesWithCount);
    }, 50);
  });
}

/**
 * Fetch a single category detail by its ID.
 * @param {string} categoryId
 * @returns {Promise<Object|null>}
 */
export async function getCategoryById(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cat = categories.find((c) => c.id === categoryId) || null;
      if (cat) {
        const count = products.filter((p) => p.categoryId === categoryId && p.active).length;
        resolve({ ...cat, count });
      } else {
        resolve(null);
      }
    }, 50);
  });
}

/**
 * Fetch all active products belonging to a specific category.
 * @param {string} categoryId
 * @returns {Promise<Array>} List of matching active products
 */
export async function getProductsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) => p.categoryId === categoryId && p.active);
      resolve(filtered);
    }, 50);
  });
}

/**
 * Fetch a single active product by its unique product ID.
 * @param {string} id
 * @returns {Promise<Object|null>} Product object or null
 */
export async function getProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id && p.active) || null;
      resolve(product);
    }, 50);
  });
}

/**
 * Fetch featured products for showcase sections.
 * @returns {Promise<Array>} List of featured active products
 */
export async function getFeaturedProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = products.filter((p) => p.featured && p.active);
      resolve(featured);
    }, 50);
  });
}

/**
 * Fetch all active products across all categories.
 * @returns {Promise<Array>} List of all active products
 */
export async function getAllProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activeProducts = products.filter((p) => p.active);
      resolve(activeProducts);
    }, 50);
  });
}
