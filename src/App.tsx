import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import PhotoDetail from "@/pages/PhotoDetail";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
          </Route>
          
          <Route path="/login" element={<Layout />}>
            <Route index element={<Login />} />
          </Route>
          
          <Route path="/register" element={<Layout />}>
            <Route index element={<Register />} />
          </Route>

          <Route path="/dashboard" element={<Layout requireAuth={true} />}>
            <Route index element={<Dashboard />} />
          </Route>
          
          <Route path="/photos/:id" element={<Layout requireAuth={true} />}>
            <Route index element={<PhotoDetail />} />
          </Route>
          
          <Route path="/admin" element={<Layout requireAuth={true} requireAdmin={true} />}>
            <Route index element={<AdminPanel />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
