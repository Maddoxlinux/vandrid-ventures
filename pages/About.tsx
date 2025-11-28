import React from 'react';
import { ShieldCheck, Truck, Users, Award } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string, params?: any) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Driving Excellence Since 2010</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Vandrid Ventures is your premier destination for high-quality automotive spare parts. 
          We bridge the gap between reliability and affordability.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Mechanic working" 
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            To empower car owners and mechanics with instant access to the widest range of authentic 
            spare parts. We believe that maintaining your vehicle shouldn't be a hassle or a gamble. 
            That's why we source directly from trusted manufacturers to ensure every part we sell meets strict quality standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <ShieldCheck className="text-brand-600 h-6 w-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Authenticity</h4>
                <p className="text-sm text-gray-500">100% Genuine parts guaranteed.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Truck className="text-brand-600 h-6 w-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Speed</h4>
                <p className="text-sm text-gray-500">Same-day dispatch for orders.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Users className="text-brand-600 h-6 w-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Community</h4>
                <p className="text-sm text-gray-500">Serving over 50,000 customers.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Award className="text-brand-600 h-6 w-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Excellence</h4>
                <p className="text-sm text-gray-500">Rated #1 in Aftermarket Service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Experts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="CEO" />
            </div>
            <h3 className="font-bold text-lg">Alex Vandrid</h3>
            <p className="text-brand-600 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
             <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="CTO" />
            </div>
            <h3 className="font-bold text-lg">Sarah Jenkins</h3>
            <p className="text-brand-600 text-sm">Head of Operations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
             <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026011d" alt="Mechanic" />
            </div>
            <h3 className="font-bold text-lg">Mike Ross</h3>
            <p className="text-brand-600 text-sm">Lead Mechanic Consultant</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
         <h2 className="text-2xl font-bold mb-4">Ready to find your part?</h2>
         <button 
           onClick={() => onNavigate('catalog')}
           className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition"
         >
           Browse Catalog
         </button>
      </div>
    </div>
  );
};

export default About;