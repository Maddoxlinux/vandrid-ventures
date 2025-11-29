
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessProps {
  onNavigate: (page: string) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for shopping with Vandrid Ventures. We have received your order and are preparing it for shipment.
      </p>
      <button 
        onClick={() => onNavigate('home')}
        className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition"
      >
        Return to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
