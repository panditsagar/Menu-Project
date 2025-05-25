import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/user/HomePage'
import MenuCategories from './components/user/MenuCategories';
import MenuItems from './components/user/MenuItems';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard';
import AddItems from './components/admin/Dashboard/AddItems';
import AllItems from './components/admin/Dashboard/AllItems';
import EditItem from './components/admin/Dashboard/EditItem';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu/categories" element={<MenuCategories />} />
        <Route path="/menu/items/:id" element={<MenuItems />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/additem/:categoryId" element={<ProtectedRoute><AddItems /></ProtectedRoute>} />
        <Route path="/admin/allitem/:categoryId" element={<ProtectedRoute><AllItems /></ProtectedRoute>} />
        <Route path="/admin/edititem/:id/:categoryId" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />  
      </Routes>
    </Router>
  )
}

export default App
