
// Equivalent to Laravel Models and Migration Schemas

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  country?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  brand_id: number;
  image_url: string;
  compatible_models: string[]; // JSON column in DB
  is_featured: boolean;
  created_at: string;
}

// User model equivalent (added phone_number as requested)
export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: 'customer' | 'admin'; // Added role field
  created_at: string;
}

// Cart Item for Session Storage
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order Interfaces for Phase 3
export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

// Helper type for filtering
export interface ProductFilter {
  search?: string;
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
}
