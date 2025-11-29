
import React, { useState } from 'react';
import { Product, Category, Brand } from '../types';
import { Plus, Trash2, Edit, Package, Search, Image as ImageIcon, Upload } from 'lucide-react';
import { CurrencyCode, formatPrice, CURRENCIES } from '../utils/currency';

interface AdminDashboardProps {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  onUpdateStock: (id: number, newStock: number) => void;
  onDeleteProduct: (id: number) => void;
  onAddProduct: (product: Product) => void;
  onAddBrand: (name: string) => number;
  onAddCategory: (name: string) => number;
  currency: CurrencyCode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products,
  brands,
  categories,
  onUpdateStock, 
  onDeleteProduct, 
  onAddProduct,
  onAddBrand,
  onAddCategory,
  currency 
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    price: 0,
    stock: 0,
    description: '',
    image_url: '',
    compatible_models: [],
    is_featured: false
  });

  // Local state for adding new Brand/Category inline
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle currency conversion
    // If currency is GHS, the entered price is GHS, convert to USD for storage
    let finalPrice = newProduct.price || 0;
    if (currency !== 'USD') {
        const rate = CURRENCIES[currency].rate;
        finalPrice = finalPrice / rate;
    }

    const product: Product = {
      id: Date.now(), // Use timestamp for unique ID to ensure deletion works correctly
      ...newProduct as Product,
      price: finalPrice,
      image_url: newProduct.image_url || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
      slug: newProduct.name?.toLowerCase().replace(/ /g, '-') || '',
      created_at: new Date().toISOString(),
      compatible_models: newProduct.compatible_models || ['Universal']
    };
    onAddProduct(product);
    setActiveTab('list');
    setNewProduct({
        name: '', sku: '', price: 0, stock: 0, description: '', image_url: '', compatible_models: [], is_featured: false
    });
    alert('Product added successfully!');
  };

  const saveNewBrand = () => {
      if (newBrandName.trim()) {
          const id = onAddBrand(newBrandName);
          setNewProduct({ ...newProduct, brand_id: id });
          setIsAddingBrand(false);
          setNewBrandName('');
      }
  };

  const saveNewCategory = () => {
      if (newCategoryName.trim()) {
          const id = onAddCategory(newCategoryName);
          setNewProduct({ ...newProduct, category_id: id });
          setIsAddingCategory(false);
          setNewCategoryName('');
      }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'list' ? 'bg-brand-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Product List
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'add' ? 'bg-brand-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image_url} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            {brands.find(b => b.id === product.brand_id)?.name} • {categories.find(c => c.id === product.category_id)?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-sm font-medium">{formatPrice(product.price, currency)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onUpdateStock(product.id, Math.max(0, product.stock - 1))}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                          type="button"
                        >
                          -
                        </button>
                        <span className={`w-8 text-center text-sm font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                        <button 
                          onClick={() => onUpdateStock(product.id, product.stock + 1)}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                        title="Delete Product"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-brand-600" /> Add New Product
          </h2>
          <form onSubmit={handleAddSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={newProduct.sku}
                  onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {isAddingCategory ? (
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                            placeholder="New Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button type="button" onClick={saveNewCategory} className="bg-green-600 text-white px-3 rounded-lg text-sm">Save</button>
                        <button type="button" onClick={() => setIsAddingCategory(false)} className="bg-gray-200 text-gray-700 px-3 rounded-lg text-sm">X</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                        onChange={e => setNewProduct({...newProduct, category_id: Number(e.target.value)})}
                        value={newProduct.category_id || ''}
                        required
                        >
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <button 
                            type="button" 
                            onClick={() => setIsAddingCategory(true)}
                            className="bg-brand-50 text-brand-600 px-3 rounded-lg font-bold text-lg hover:bg-brand-100"
                            title="Add New Category"
                        >+</button>
                    </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                {isAddingBrand ? (
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                            placeholder="New Brand Name"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                        />
                        <button type="button" onClick={saveNewBrand} className="bg-green-600 text-white px-3 rounded-lg text-sm">Save</button>
                        <button type="button" onClick={() => setIsAddingBrand(false)} className="bg-gray-200 text-gray-700 px-3 rounded-lg text-sm">X</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                        onChange={e => setNewProduct({...newProduct, brand_id: Number(e.target.value)})}
                        value={newProduct.brand_id || ''}
                        required
                        >
                        <option value="">Select Brand</option>
                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                         <button 
                            type="button" 
                            onClick={() => setIsAddingBrand(true)}
                            className="bg-brand-50 text-brand-600 px-3 rounded-lg font-bold text-lg hover:bg-brand-100"
                            title="Add New Brand"
                        >+</button>
                    </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ({CURRENCIES[currency].label})
                </label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
                {currency !== 'USD' && (
                    <p className="text-xs text-gray-500 mt-1">
                        Will be saved as approx {formatPrice((newProduct.price || 0) / CURRENCIES[currency].rate, 'USD')} USD
                    </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
                <input 
                  type="number" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={newProduct.stock || ''}
                  onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              
              <div className="space-y-4">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Upload className="h-6 w-6 text-brand-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Click to upload from device</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px recommended)</p>
                </div>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or use URL</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* URL Input */}
                <div className="relative">
                  <input 
                      type="url" 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                      placeholder="https://example.com/image.jpg"
                      value={newProduct.image_url}
                      onChange={e => setNewProduct({...newProduct, image_url: e.target.value})}
                  />
                  <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                {/* Preview */}
                {newProduct.image_url && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 inline-block">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Selected Image Preview:</p>
                        <div className="relative h-40 w-full min-w-[200px] rounded overflow-hidden bg-white border border-gray-200">
                           <img src={newProduct.image_url} alt="Preview" className="h-full w-full object-contain" />
                        </div>
                    </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={3} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition">
              Create Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
