
import React, { useState, useEffect } from 'react';
import { Product, Category, Brand } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, Settings, Disc, Zap, Box, Droplet } from 'lucide-react';
import { CurrencyCode } from '../utils/currency';

interface CatalogProps {
  initialSearch?: string;
  initialCategoryId?: number | null;
  initialBrandId?: number | null;
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (id: number) => void;
  currency: CurrencyCode;
  products: Product[];
  brands: Brand[];
  categories: Category[];
}

const Catalog: React.FC<CatalogProps> = ({ 
  initialSearch = '', 
  initialCategoryId = null, 
  initialBrandId = null,
  onNavigate,
  onAddToCart,
  currency,
  products,
  brands,
  categories
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filter States
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(initialBrandId);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Filter products whenever state or products prop changes
    const filtered = products.filter(product => {
      let matches = true;

      if (search) {
        const searchLower = search.toLowerCase();
        matches = matches && (
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.compatible_models.some(m => m.toLowerCase().includes(searchLower))
        );
      }

      if (selectedCategory) {
        matches = matches && product.category_id === selectedCategory;
      }

      if (selectedBrand) {
        matches = matches && product.brand_id === selectedBrand;
      }

      return matches;
    });
    setFilteredProducts(filtered);
  }, [search, selectedCategory, selectedBrand, products]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const getCategoryIcon = (iconName: string | undefined) => {
    switch (iconName) {
      case 'Settings': return <Settings className="h-4 w-4" />;
      case 'Disc': return <Disc className="h-4 w-4" />;
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Box': return <Box className="h-4 w-4" />;
      case 'Droplet': return <Droplet className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Catalog</h2>
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`
          fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-transparent md:w-64 md:block
          ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-y-auto md:overflow-visible p-6 md:p-0 bg-white md:bg-transparent">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}><X className="h-6 w-6" /></button>
            </div>

            <div className="bg-white rounded-lg md:shadow-sm md:border md:border-gray-100 md:p-6 space-y-8">
              {/* Active Filters Summary */}
              {(selectedCategory || selectedBrand || search) && (
                 <div className="pb-6 border-b border-gray-100">
                   <div className="flex justify-between items-center mb-2">
                     <h3 className="font-semibold text-sm text-gray-900">Active Filters</h3>
                     <button onClick={clearFilters} className="text-xs text-brand-600 hover:underline">Clear All</button>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {search && (
                       <span className="inline-flex items-center px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">
                         Search: "{search}"
                         <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearch('')} />
                       </span>
                     )}
                     {selectedCategory && (
                       <span className="inline-flex items-center px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">
                         Cat: {categories.find(c => c.id === selectedCategory)?.name}
                         <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                       </span>
                     )}
                     {selectedBrand && (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">
                         Brand: {brands.find(b => b.id === selectedBrand)?.name}
                         <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedBrand(null)} />
                       </span>
                     )}
                   </div>
                 </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-500" /> Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-gray-50 rounded transition">
                      <div className={`
                        w-5 h-5 rounded border flex items-center justify-center transition flex-shrink-0
                        ${selectedCategory === cat.id ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white group-hover:border-brand-400'}
                      `}>
                        {selectedCategory === cat.id && <span className="text-white text-xs">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedCategory === cat.id}
                        onChange={() => {
                          setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                        }}
                      />
                      <div className={`flex items-center gap-2 text-sm ${selectedCategory === cat.id ? 'text-brand-700 font-medium' : 'text-gray-600'}`}>
                        <span className="text-gray-400 group-hover:text-brand-500">
                          {getCategoryIcon(cat.icon)}
                        </span>
                        <span>{cat.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-gray-50 rounded transition">
                       <div className={`
                        w-5 h-5 rounded border flex items-center justify-center transition flex-shrink-0
                        ${selectedBrand === brand.id ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white group-hover:border-brand-400'}
                      `}>
                        {selectedBrand === brand.id && <span className="text-white text-xs">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={selectedBrand === brand.id}
                        onChange={() => {
                          setSelectedBrand(selectedBrand === brand.id ? null : brand.id);
                        }}
                      />
                      <span className={`text-sm ${selectedBrand === brand.id ? 'text-brand-700 font-medium' : 'text-gray-600'}`}>
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {search ? `Results for "${search}"` : selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
              <span className="text-gray-500 text-lg font-normal ml-2">({filteredProducts.length})</span>
            </h1>
            <select className="border-gray-300 rounded-md text-sm focus:ring-brand-500 focus:border-brand-500 border px-3 py-2 bg-white w-full sm:w-auto">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg mb-2">No products found matching your criteria.</p>
              <button onClick={clearFilters} className="text-brand-600 font-medium hover:underline">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  category={categories.find(c => c.id === product.category_id)}
                  brand={brands.find(b => b.id === product.brand_id)}
                  onView={(id) => onNavigate('product', { id })}
                  onAddToCart={onAddToCart}
                  currency={currency}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
