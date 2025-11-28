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

// Helper type for filtering
export interface ProductFilter {
  search?: string;
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
}