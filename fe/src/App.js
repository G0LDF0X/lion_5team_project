import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import BookmarkScreen from './screens/BookmarkScreen';
function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/items' element={<ProductsScreen/>} />
            <Route path='/items/detail/:id' element={<ProductsScreen/>} />
            <Route path='/cart' element={<CartScreen/>} />
            <Route path='/users/bookmark/' element={<BookmarkScreen/>} />
          </Routes>
        </Container>  
      </main>
      <Footer />
    </Router>
  )

}

export default App;
