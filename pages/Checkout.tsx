
import React, { useState } from 'react';
import { CartItem, User } from '../types';
import { CurrencyCode, formatPrice } from '../utils/currency';
import { Lock, CreditCard } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  user: User | null;
  onPlaceOrder: (shippingAddress: string) => void;
  onNavigate: (page: string) => void;
  currency: CurrencyCode;
}

const Checkout: React.FC<CheckoutProps> = ({ items, user, onPlaceOrder, onNavigate, currency }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Login to Checkout</h2>
        <p className="mb-8 text-gray-600">You need to have an account to place an order.</p>
        <button 
          onClick={() => onNavigate('login')}
          className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${address}, ${city}, ${zip}`;
    onPlaceOrder(fullAddress);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-900"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-6">Payment Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Payment gateway is simulated. No actual charge will be made.</span>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{item.quantity}x</span>
                    <span className="text-gray-600">{item.product.name}</span>
                  </div>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity, currency)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax, currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-gray-900 mt-4">
                <span>Total</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="w-full mt-8 bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" /> Place Secure Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
