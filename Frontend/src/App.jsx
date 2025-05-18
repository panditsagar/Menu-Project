import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/user/HomePage'
import MenuCategories from './components/user/MenuCategories';
import MenuItems from './components/user/MenuItems';
import Login from './components/admin/Login';
import AllCategories from './components/admin/Dashboard/AllCategories';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu/categories" element={<MenuCategories />} />
        <Route path="/menu/items" element={<MenuItems />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
