// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import ProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Storefront */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:categoryId" element={<CategoryPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute><AdminProducts /></ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute><AdminProductForm /></ProtectedRoute>
          } />
          <Route path="/admin/products/:id/edit" element={
            <ProtectedRoute><AdminProductForm /></ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute><AdminCategories /></ProtectedRoute>
          } />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
