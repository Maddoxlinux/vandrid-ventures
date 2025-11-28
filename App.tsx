
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import { getProductById } from './services/db';
import { Product } from './types';
import { CurrencyCode } from './utils/currency';

// Types for navigation state
type Page = 'home' | 'catalog' | 'product' | 'about' | 'cart' | 'contact';

interface NavParams {
  id?: number;            // For ProductDetail
  category_id?: number;   // For Catalog pre-filter
  brand_id?: number;      // For Catalog pre-filter
  search?: string;        // For Catalog search
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [navParams, setNavParams] = useState<NavParams>({});
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('GHS'); // Default to GHS as requested

  // Simple router function
  const handleNavigate = (page: string, params: NavParams = {}) => {
    window.scrollTo(0, 0);
    setCurrentPage(page as Page);
    setNavParams(params);
  };

  const handleSearch = (query: string) => {
    handleNavigate('catalog', { search: query });
  };

  const handleAddToCart = (id: number) => {
    const product = getProductById(id);
    if (product) {
      setCartItems(prev => [...prev, product]);
      // Optional: Add a toast notification here
      alert(`${product.name} added to cart!`);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar 
        onNavigate={(page) => handleNavigate(page)} 
        onSearch={handleSearch}
        cartCount={cartItems.length}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
      
      <main className="flex-grow bg-gray-50">
        {currentPage === 'home' && (
          <Home onNavigate={handleNavigate} currency={currency} />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <Contact onNavigate={handleNavigate} />
        )}

        {currentPage === 'cart' && (
          <Cart 
            items={cartItems} 
            onRemove={handleRemoveFromCart} 
            onNavigate={handleNavigate}
            currency={currency}
          />
        )}
        
        {currentPage === 'catalog' && (
          <Catalog 
            // Key forces remount when params change, ensuring filters reset/update correctly
            key={`catalog-${JSON.stringify(navParams)}`}
            onNavigate={handleNavigate} 
            initialSearch={navParams.search}
            initialCategoryId={navParams.category_id}
            initialBrandId={navParams.brand_id}
            currency={currency}
          />
        )}
        
        {currentPage === 'product' && navParams.id && (
          <ProductDetail 
            productId={navParams.id} 
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            currency={currency}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
