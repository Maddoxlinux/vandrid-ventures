
import React from 'react';
import { Product, Category, Brand } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  category?: Category;
  brand?: Brand;
  onView: (id: number) => void;
  onAddToCart?: (id: number) => void;
  currency: CurrencyCode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category, brand, onView, onAddToCart, currency }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col h-full group">
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100 cursor-pointer" onClick={() => onView(product.id)}>
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2 text-xs text-gray-500 flex justify-between">
          <span>{category?.name}</span>
          <span className="font-semibold text-gray-700">{brand?.name}</span>
        </div>
        
        <h3 
          className="text-lg font-semibold text-gray-900 mb-1 hover:text-brand-600 cursor-pointer line-clamp-2"
          onClick={() => onView(product.id)}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price, currency)}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => onView(product.id)}
              className="p-2 text-gray-500 hover:text-brand-600 hover:bg-gray-100 rounded-full transition"
              title="View Details"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAddToCart?.(product.id); }}
              className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition shadow-sm"
              title="Add to Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
