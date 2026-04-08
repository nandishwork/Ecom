import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Shop from './pages/Shop';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          {/* Fixed Header */}
          <header className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </header>

          {/* Routes */}
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/shop"       element={<Shop />} />
          </Routes>

          {/* Footer */}
          <Footer />

          {/* Global Cart Drawer — renders above everything */}
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
