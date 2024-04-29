import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Product from '../components/Product';
function UserSettingScreen() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/items" element={<Product />} />
        </Routes>
      </Router>
    </div>
  )
}

export default UserSettingScreen
