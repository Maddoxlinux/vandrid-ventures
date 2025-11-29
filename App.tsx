
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { PRODUCTS, BRANDS, CATEGORIES } from './services/db';
import { CartItem, User, Product, Brand, Category } from './types';
import { CurrencyCode } from './utils/currency';

// Types for navigation state
type Page = 'home' | 'catalog' | 'product' | 'about' | 'cart' | 'contact' | 'login' | 'register' | 'dashboard' | 'checkout' | 'order-success';

interface NavParams {
  id?: number;            // For ProductDetail
  category_id?: number;   // For Catalog pre-filter
  brand_id?: number;      // For Catalog pre-filter
  search?: string;        // For Catalog search
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [navParams, setNavParams] = useState<NavParams>({});
  
  // App Data State (Lifted from DB to allow mutations)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>(BRANDS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  
  // Cart State (Simulating Session)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Auth State (Simulating Laravel Auth)
  const [user, setUser] = useState<User | null>(null);
  
  const [currency, setCurrency] = useState<CurrencyCode>('GHS');

  // Simple router function
  const handleNavigate = (page: string, params: NavParams = {}) => {
    window.scrollTo(0, 0);
    setCurrentPage(page as Page);
    setNavParams(params);
  };

  const handleSearch = (query: string) => {
    handleNavigate('catalog', { search: query });
  };

  // Cart Controller Logic
  const handleAddToCart = (id: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (product.stock <= 0) {
      alert("Sorry, this item is out of stock.");
      return;
    }

    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.product.id === id);
      
      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        alert(`Updated ${product.name} quantity in cart!`);
        return newCart;
      } else {
        // New item
        alert(`${product.name} added to cart!`);
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const newCart = [...prev];
      newCart[index].quantity = newQuantity;
      return newCart;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Checkout Logic
  const handlePlaceOrder = (shippingAddress: string) => {
    console.log("Order placed to:", shippingAddress, "Items:", cartItems);
    setCartItems([]);
    handleNavigate('order-success');
  };

  // Admin Controller Logic
  const handleUpdateStock = (id: number, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleAddBrand = (name: string) => {
    const newBrand: Brand = {
      id: Math.max(...brands.map(b => b.id)) + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      country: 'Unknown'
    };
    setBrands(prev => [...prev, newBrand]);
    return newBrand.id;
  };

  const handleAddCategory = (name: string) => {
     const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      icon: 'Settings'
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory.id;
  };

  // Auth Controller Logic
  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    handleNavigate(mockUser.role === 'admin' ? 'dashboard' : 'home');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar 
        onNavigate={(page) => handleNavigate(page)} 
        onSearch={handleSearch}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        currency={currency}
        onCurrencyChange={setCurrency}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow bg-gray-50">
        {currentPage === 'home' && (
          <Home 
            onNavigate={handleNavigate} 
            onAddToCart={handleAddToCart}
            currency={currency}
            products={products}
            brands={brands}
            categories={categories}
          />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <Contact onNavigate={handleNavigate} />
        )}

        {currentPage === 'login' && (
          <Login onLogin={handleLogin} onNavigate={handleNavigate} />
        )}

        {currentPage === 'register' && (
          <Register onRegister={handleLogin} onNavigate={handleNavigate} />
        )}

        {currentPage === 'cart' && (
          <Cart 
            items={cartItems} 
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart} 
            onNavigate={handleNavigate}
            currency={currency}
          />
        )}
        
        {currentPage === 'checkout' && (
          <Checkout 
            items={cartItems}
            user={user}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
            currency={currency}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccess onNavigate={handleNavigate} />
        )}

        {currentPage === 'dashboard' && user?.role === 'admin' && (
          <AdminDashboard 
            products={products}
            brands={brands}
            categories={categories}
            onUpdateStock={handleUpdateStock}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleAddProduct}
            onAddBrand={handleAddBrand}
            onAddCategory={handleAddCategory}
            currency={currency}
          />
        )}
        
        {currentPage === 'catalog' && (
          <Catalog 
            key={`catalog-${JSON.stringify(navParams)}`}
            onNavigate={handleNavigate} 
            onAddToCart={handleAddToCart}
            initialSearch={navParams.search}
            initialCategoryId={navParams.category_id}
            initialBrandId={navParams.brand_id}
            currency={currency}
            products={products}
            brands={brands}
            categories={categories}
          />
        )}
        
        {currentPage === 'product' && navParams.id && (
          <ProductDetail 
            productId={navParams.id} 
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            currency={currency}
            products={products}
            brands={brands}
            categories={categories}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
