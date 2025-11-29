
import React from 'react';
import { CartItem } from '../types';
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CurrencyCode, formatPrice } from '../utils/currency';

interface CartProps {
  items: CartItem[];
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onNavigate: (page: string) => void;
  currency: CurrencyCode;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, onNavigate, currency }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any parts yet.</p>
        <button 
          onClick={() => onNavigate('catalog')}
          className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 border-b border-gray-100 last:border-0 items-center">
                
                {/* Product Info */}
                <div className="col-span-6 w-full flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">SKU: {item.product.sku}</p>
                    <button 
                       onClick={() => onRemove(index)}
                       className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 w-full md:text-center flex justify-between md:block">
                   <span className="md:hidden text-gray-500 text-sm">Price:</span>
                   <span className="text-gray-900 font-medium">{formatPrice(item.product.price, currency)}</span>
                </div>

                {/* Quantity */}
                <div className="col-span-2 w-full flex justify-between md:justify-center">
                   <span className="md:hidden text-gray-500 text-sm">Quantity:</span>
                   <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 py-1 text-sm font-medium min-w-[30px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="col-span-2 w-full md:text-right flex justify-between md:block">
                  <span className="md:hidden text-gray-500 text-sm">Total:</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(item.product.price * item.quantity, currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax, currency)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>

            <button 
              onClick={() => alert('Proceeding to Checkout... (Phase 3)')}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onNavigate('catalog')}
              className="w-full mt-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
