import React from 'react';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <Car className="h-6 w-6 text-brand-400" />
              <span className="text-xl font-bold">Vandrid<span className="text-brand-400">Ventures</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for high-quality automotive spare parts. 
              We supply genuine and aftermarket parts for Toyota, Honda, BMW, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={(e) => handleNav(e, 'home')} className="hover:text-brand-400 transition text-left">Home</button></li>
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Shop Catalog</button></li>
              <li><button onClick={(e) => handleNav(e, 'about')} className="hover:text-brand-400 transition text-left">About Us</button></li>
              <li><button className="hover:text-brand-400 transition text-left text-gray-500 cursor-not-allowed">Shipping Policy</button></li>
              <li><button className="hover:text-brand-400 transition text-left text-gray-500 cursor-not-allowed">Returns & Warranty</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {/* Note: In a real app these would map to specific category IDs, defaulting to catalog for now */}
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Engine Parts</button></li>
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Braking System</button></li>
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Suspension</button></li>
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Electrical</button></li>
              <li><button onClick={(e) => handleNav(e, 'catalog')} className="hover:text-brand-400 transition text-left">Accessories</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-400" />
                <span>123 Auto Avenue, Mechanic City, MC 90210</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" />
                <span>support@vandridventures.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vandrid Ventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;