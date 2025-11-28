import React from 'react';
import { Product } from '../types';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: Product[];
  onRemove: (index: number) => void;
  onNavigate: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onNavigate }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
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
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length})</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0">
                <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.sku}</p>
                  <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => onRemove(index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                  title="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2">
              Checkout <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Secure checkout provided by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;