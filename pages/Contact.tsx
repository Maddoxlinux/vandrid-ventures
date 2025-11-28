import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ArrowLeft } from 'lucide-react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center text-sm text-gray-500 hover:text-brand-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question about a part? Need help finding the right component for your vehicle? 
          Our team of experts is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-brand-500" /> Send us a Message
          </h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-700">
                Thank you for contacting us. One of our specialists will get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-green-700 font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select 
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Part Compatibility Check</option>
                  <option>Returns & Warranty</option>
                  <option>Wholesale / B2B</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition">
              <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Visit Our Store</h3>
                <p className="text-gray-600">
                  123 Auto Avenue<br />
                  Mechanic City, MC 90210<br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition">
              <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                <p className="text-gray-600 mb-2">Mon-Fri from 8am to 6pm.</p>
                <a href="tel:+15551234567" className="text-brand-600 font-bold hover:underline">+1 (555) 123-4567</a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition">
              <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email Support</h3>
                <p className="text-gray-600 mb-2">We usually reply within 2 hours.</p>
                <a href="mailto:support@vandridventures.com" className="text-brand-600 font-bold hover:underline">support@vandridventures.com</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition">
              <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Working Hours</h3>
                <div className="grid grid-cols-2 gap-x-8 text-gray-600">
                  <span>Monday - Friday:</span>
                  <span className="text-gray-900 font-medium text-right">8:00 AM - 6:00 PM</span>
                  <span>Saturday:</span>
                  <span className="text-gray-900 font-medium text-right">9:00 AM - 4:00 PM</span>
                  <span>Sunday:</span>
                  <span className="text-gray-900 font-medium text-right">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="mt-16 bg-gray-200 rounded-xl h-96 w-full flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-50 grayscale" style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}></div>
          <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center shadow-lg">
             <MapPin className="h-10 w-10 text-brand-600 mx-auto mb-2" />
             <p className="font-bold text-gray-900">Interactive Map Component</p>
             <p className="text-sm text-gray-500">Google Maps API integration would go here</p>
          </div>
      </div>
    </div>
  );
};

export default Contact;