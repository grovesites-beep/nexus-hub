/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { getAuth } from './lib/auth';
import RoleLayout from './components/layout/RoleLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import { databases, DATABASE_ID, COLLECTIONS } from './lib/appwrite';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClientes from './pages/admin/AdminClientes';
import AdminConfig from './pages/admin/AdminConfig';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientLeads from './pages/client/ClientLeads';
import ClientConfig from './pages/client/ClientConfig';

// Copywriter Pages
import CopywriterDashboard from './pages/copywriter/CopywriterDashboard';
import CopywriterEditor from './pages/copywriter/CopywriterEditor';

import { LayoutDashboard, Users, Settings, PenTool, FileText, Briefcase } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const { role, impersonating } = getAuth();
  
  if (!role) return <Navigate to="/login" />;
  
  // Admin can impersonate Client
  if (allowedRole === 'client' && role === 'admin' && impersonating) {
    return <>{children}</>;
  }
  
  if (role !== allowedRole) return <Navigate to={`/${role}`} />;
  
  return <>{children}</>;
};

export default function App() {
  // Apply global CSS variables on initial load
  useEffect(() => {
    const applyCache = () => {
      const root = document.documentElement;
      const primaryColor = localStorage.getItem('primaryColor') || '#18181b';
      const bgColor = localStorage.getItem('bgColor') || '#fafafa';
      const borderRadius = localStorage.getItem('borderRadius') || '0.5rem';
      const globalFont = localStorage.getItem('globalFont') || 'Inter';

      root.style.setProperty('--primary-color', primaryColor);
      root.style.setProperty('--bg-color', bgColor);
      root.style.setProperty('--radius', borderRadius);
      
      let fontValue = '"Inter", ui-sans-serif, system-ui, sans-serif';
      if (globalFont === 'Roboto') fontValue = '"Roboto", ui-sans-serif, system-ui, sans-serif';
      if (globalFont === 'Playfair Display') fontValue = '"Playfair Display", ui-serif, Georgia, serif';
      root.style.setProperty('--font-global', fontValue);

      const cssCustom = localStorage.getItem('cssCustom');
      if (cssCustom) {
        let styleEl = document.getElementById('nexus-custom-css');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'nexus-custom-css';
          document.head.appendChild(styleEl);
        }
        styleEl.innerHTML = cssCustom;
      }
    };

    const fetchConfig = async () => {
      try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTIONS.ADMIN_CONFIG, 'global');
        
        const root = document.documentElement;
        const primaryColor = res.primaryColor || '#18181b';
        const bgColor = res.bgColor || '#fafafa';
        const borderRadius = res.borderRadius || '0.5rem';
        const globalFont = res.globalFont || 'Inter';
        const loaderSpinner = res.loaderSpinner || 'spinner';
        const cssCustom = res.cssCustom || '';

        root.style.setProperty('--primary-color', primaryColor);
        root.style.setProperty('--bg-color', bgColor);
        root.style.setProperty('--radius', borderRadius);
        
        let fontValue = '"Inter", ui-sans-serif, system-ui, sans-serif';
        if (globalFont === 'Roboto') fontValue = '"Roboto", ui-sans-serif, system-ui, sans-serif';
        if (globalFont === 'Playfair Display') fontValue = '"Playfair Display", ui-serif, Georgia, serif';
        root.style.setProperty('--font-global', fontValue);

        if (cssCustom) {
          let styleEl = document.getElementById('nexus-custom-css');
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'nexus-custom-css';
            document.head.appendChild(styleEl);
          }
          styleEl.innerHTML = cssCustom;
        }

        localStorage.setItem('primaryColor', primaryColor);
        localStorage.setItem('bgColor', bgColor);
        localStorage.setItem('borderRadius', borderRadius);
        localStorage.setItem('globalFont', globalFont);
        localStorage.setItem('loaderSpinner', loaderSpinner);
        localStorage.setItem('cssCustom', cssCustom);
      } catch (e) {
        console.error('Erro ao buscar admin_config, usando cache local');
      }
    };

    applyCache(); // Load fast initially
    fetchConfig(); // Update from backend
  }, []);

  const adminNav = [
    { name: 'Dashboard Global', href: '/admin', icon: LayoutDashboard },
    { name: 'Clientes (Tenants)', href: '/admin/clientes', icon: Users },
    { name: 'Configurações', href: '/admin/config', icon: Settings },
  ];

  const clientNav = [
    { name: 'Visão Geral', href: '/client', icon: LayoutDashboard },
    { name: 'Oportunidades', href: '/client/leads', icon: Users },
    { name: 'Artigos', href: '/client/artigos', icon: FileText },
    { name: 'Configurações', href: '/client/config', icon: Settings },
  ];

  const copywriterNav = [
    { name: 'Calendário (Kanban)', href: '/copywriter', icon: LayoutDashboard },
    { name: 'Editor de Artigos', href: '/copywriter/editor', icon: PenTool },
  ];

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><RoleLayout navigation={adminNav} roleName="Admin" basePath="/admin" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="clientes" element={<AdminClientes />} />
          <Route path="config" element={<AdminConfig />} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ProtectedRoute allowedRole="client"><RoleLayout navigation={clientNav} roleName="Cliente" basePath="/client" /></ProtectedRoute>}>
          <Route index element={<ClientDashboard />} />
          <Route path="leads" element={<ClientLeads />} />
          {/* Fallbacks for demo */}
          <Route path="artigos" element={<div className="p-6 text-zinc-500">Página de Artigos do Cliente em construção...</div>} />
          <Route path="config" element={<ClientConfig />} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        {/* Copywriter Routes */}
        <Route path="/copywriter" element={<ProtectedRoute allowedRole="copywriter"><RoleLayout navigation={copywriterNav} roleName="Copywriter" basePath="/copywriter" /></ProtectedRoute>}>
          <Route index element={<CopywriterDashboard />} />
          <Route path="editor" element={<CopywriterEditor />} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
