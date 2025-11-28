import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { getFeaturedProducts, getCategories, getBrands } from '../services/db';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  const brands = getBrands();

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        ></div>
        
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Premium Parts for <br />
            <span className="text-brand-400">Peak Performance</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            Find the exact spare parts you need for Toyota, Honda, BMW, and more. Quality guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('catalog')}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
            >
              Shop Catalog <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onNavigate('catalog')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Find My Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-brand-100 p-3 rounded-full text-brand-600">
              <Truck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Fast Shipping</h3>
              <p className="text-sm text-gray-500">Nationwide delivery within 2-3 days</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-brand-100 p-3 rounded-full text-brand-600">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Quality Guarantee</h3>
              <p className="text-sm text-gray-500">1-year warranty on all mechanical parts</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-brand-100 p-3 rounded-full text-brand-600">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Expert Support</h3>
              <p className="text-sm text-gray-500">Free technical advice from mechanics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
          <button onClick={() => onNavigate('catalog')} className="text-brand-600 hover:text-brand-800 font-medium hidden sm:block">View All Categories</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => onNavigate('catalog', { category_id: cat.id })}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center border border-gray-100 hover:border-brand-200 group"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-brand-50 transition">
                {/* Placeholder icons based on slug/name logic or simple text */}
                <span className="text-2xl text-gray-400 group-hover:text-brand-600">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-brand-600">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 bg-gray-50 py-8 rounded-2xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Top-rated parts selected for you</p>
          </div>
          <button onClick={() => onNavigate('catalog')} className="text-brand-600 hover:text-brand-800 font-medium">View All Products</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              category={categories.find(c => c.id === product.category_id)}
              brand={brands.find(b => b.id === product.brand_id)}
              onView={(id) => onNavigate('product', { id })}
              onAddToCart={() => alert('Item added to cart!')}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;