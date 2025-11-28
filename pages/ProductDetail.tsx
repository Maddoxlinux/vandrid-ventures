import React, { useState, useEffect } from 'react';
import { getProductById, getCategories, getBrands } from '../services/db';
import { Product, Category, Brand } from '../types';
import { ArrowLeft, Check, ShoppingCart, Truck, Shield } from 'lucide-react';

interface ProductDetailProps {
  productId: number;
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (id: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate, onAddToCart }) => {
  const [product, setProduct] = useState<Product | undefined>();
  const [category, setCategory] = useState<Category | undefined>();
  const [brand, setBrand] = useState<Brand | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setCategory(getCategories().find(c => c.id === foundProduct.category_id));
      setBrand(getBrands().find(b => b.id === foundProduct.brand_id));
    }
    setLoading(false);
  }, [productId]);

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!product) return <div className="p-12 text-center">Product not found. <button onClick={() => onNavigate('catalog')} className="text-brand-600">Go Back</button></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <button 
        onClick={() => onNavigate('catalog')}
        className="flex items-center text-sm text-gray-500 hover:text-brand-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Catalog
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-sm"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-12 flex flex-col">
            <div className="mb-4">
               <div className="flex items-center gap-2 mb-2">
                 {product.is_featured && <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-0.5 rounded">Featured</span>}
                 <span className="text-sm text-gray-500">{category?.name}</span>
               </div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
               <div className="flex items-center gap-4 text-sm">
                 <span className="text-gray-500">Brand: <span className="text-gray-900 font-medium">{brand?.name}</span></span>
                 <span className="text-gray-500">SKU: <span className="text-gray-900 font-medium">{product.sku}</span></span>
               </div>
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-6">
              ${product.price.toFixed(2)}
            </div>

            <div className="prose prose-sm text-gray-600 mb-8">
              <h3 className="text-gray-900 font-semibold mb-2">Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 font-semibold mb-3">Compatible Models</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatible_models.map((model, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-sm">
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="text-orange-500 ml-2 text-xs">Only {product.stock} left!</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onAddToCart(product.id)}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 hover:border-brand-400 hover:text-brand-600 text-gray-700 font-semibold py-3 px-6 rounded-lg transition">
                  Save for Later
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-brand-500 mt-0.5" />
                  <div className="text-xs text-gray-500">
                    <strong className="block text-gray-900">Fast Delivery</strong>
                    Ships within 24 hours
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-brand-500 mt-0.5" />
                  <div className="text-xs text-gray-500">
                    <strong className="block text-gray-900">Genuine Parts</strong>
                    100% Authentic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;