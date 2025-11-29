
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Car, X, Globe, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { CurrencyCode, CURRENCIES } from '../utils/currency';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  cartCount: number;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onSearch, 
  cartCount, 
  currency, 
  onCurrencyChange,
  user,
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-brand-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <Car className="h-8 w-8 text-brand-400" />
            <span className="text-2xl font-bold tracking-tight">Vandrid<span className="text-brand-400">Ventures</span></span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search by part name, SKU, or car model..."
                className="w-full pl-4 pr-10 py-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-brand-300 font-medium">Home</button>
            <button onClick={() => onNavigate('catalog')} className="hover:text-brand-300 font-medium">Catalog</button>
            
            {/* Admin Dashboard Link */}
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate('dashboard')} 
                className="hover:text-brand-300 font-medium flex items-center gap-1 text-brand-400"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </button>
            )}

            <button onClick={() => onNavigate('contact')} className="hover:text-brand-300 font-medium">Contact</button>
            
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-brand-800 rounded px-2 py-1">
              <span className="text-xs text-brand-300">Currency:</span>
              <select 
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer"
              >
                {Object.keys(CURRENCIES).map((code) => (
                  <option key={code} value={code} className="text-gray-900">
                    {code}
                  </option>
                ))}
              </select>
            </div>

            {/* User Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm hidden lg:inline">Hi, {user.name}</span>
                <button 
                  onClick={onLogout}
                  className="hover:text-brand-300" 
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="flex items-center gap-1 hover:text-brand-300"
              >
                <UserIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Login</span>
              </button>
            )}

            <div 
              className="relative cursor-pointer hover:text-brand-300 transition"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <div 
              className="relative cursor-pointer hover:text-brand-300 transition"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-800 pb-4 px-4 pt-2">
          <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="mb-4 relative">
             <input
                type="text"
                placeholder="Search parts..."
                className="w-full pl-4 pr-10 py-2 rounded-lg text-gray-900 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
          </form>
          <div className="flex flex-col gap-3">
            {user && (
               <div className="text-brand-300 text-sm pb-2 border-b border-brand-700">
                 Signed in as <span className="font-bold text-white">{user.name}</span>
               </div>
            )}
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700">Home</button>
            <button onClick={() => { onNavigate('catalog'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700">Catalog</button>
             {user?.role === 'admin' && (
               <button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700 text-brand-400">Dashboard</button>
             )}
             <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700">About</button>
             <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700">Contact</button>
            
            {/* Mobile Currency Selector */}
            <div className="flex items-center justify-between py-2 border-b border-brand-700">
              <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Currency</span>
              <select 
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-brand-700 border border-brand-600 rounded px-2 py-1 text-sm text-white"
              >
                {Object.keys(CURRENCIES).map((code) => (
                  <option key={code} value={code}>
                    {CURRENCIES[code as CurrencyCode].label}
                  </option>
                ))}
              </select>
            </div>

            {!user ? (
               <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700">Login / Register</button>
            ) : (
               <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-brand-700 text-red-300">Logout</button>
            )}

            <button onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }} className="text-left py-2 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" /> Cart ({cartCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
