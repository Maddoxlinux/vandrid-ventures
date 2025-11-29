
import React, { useState } from 'react';
import { User } from '../types';
import { Car, ArrowRight, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to determine role based on email
    const isAdmin = email.toLowerCase() === 'admin@vandrid.com';

    // Simulate API login
    const mockUser: User = {
      id: 1,
      name: isAdmin ? 'Vandrid Admin' : 'Customer User',
      email: email,
      phone_number: '0555555555',
      role: isAdmin ? 'admin' : 'customer',
      created_at: new Date().toISOString()
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
             <div className="bg-brand-100 p-3 rounded-full">
               <Lock className="h-8 w-8 text-brand-600" />
             </div>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder="admin@vandrid.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: '#000', backgroundColor: '#fff' }} // Force high contrast
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: '#000', backgroundColor: '#fff' }} // Force high contrast
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-brand-600 hover:text-brand-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="font-medium text-brand-600 hover:text-brand-500">
              Register here
            </button>
          </p>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center text-xs text-blue-800 border border-blue-100">
           Tip: Use <strong>admin@vandrid.com</strong> to access the dashboard.
        </div>
      </div>
    </div>
  );
};

export default Login;
