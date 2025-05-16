import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/user/HomePage'
import MenuCategories from './components/user/MenuCategories';
import MenuItems from './components/user/MenuItems';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/categories" element={<MenuCategories />} />
              <Route path="/menu/items" element={<MenuItems />} />
      </Routes>
    </Router>
  )
}

export default App
