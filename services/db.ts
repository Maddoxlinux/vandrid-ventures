import { Brand, Category, Product } from '../types';

/**
 * DATABASE SEEDER
 * This simulates the database content requested in the PRD.
 */

export const BRANDS: Brand[] = [
  { id: 1, name: 'Toyota', slug: 'toyota', country: 'Japan' },
  { id: 2, name: 'Honda', slug: 'honda', country: 'Japan' },
  { id: 3, name: 'BMW', slug: 'bmw', country: 'Germany' },
  { id: 4, name: 'Ford', slug: 'ford', country: 'USA' },
  { id: 5, name: 'Nissan', slug: 'nissan', country: 'Japan' },
];

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Engine Components', slug: 'engine', icon: 'Settings' },
  { id: 2, name: 'Brakes & Suspension', slug: 'brakes-suspension', icon: 'Disc' },
  { id: 3, name: 'Electrical & Lighting', slug: 'electrical', icon: 'Zap' },
  { id: 4, name: 'Body & Exhaust', slug: 'body-exhaust', icon: 'Box' },
  { id: 5, name: 'Oils & Fluids', slug: 'oils-fluids', icon: 'Droplet' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'High Performance Brake Pads',
    slug: 'high-perf-brake-pads',
    sku: 'BP-TY-001',
    description: 'Ceramic brake pads designed for maximum stopping power and low dust. Ideal for city and highway driving.',
    price: 45.99,
    stock: 100,
    category_id: 2,
    brand_id: 1, // Toyota
    image_url: 'https://picsum.photos/id/1/400/400',
    compatible_models: ['Camry', 'Corolla', 'RAV4'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Synthetic Motor Oil 5W-30',
    slug: 'synthetic-oil-5w30',
    sku: 'OIL-5W30-4L',
    description: 'Advanced full synthetic formula for superior engine protection against heat, deposits and wear.',
    price: 32.50,
    stock: 500,
    category_id: 5,
    brand_id: 1, // Toyota
    image_url: 'https://picsum.photos/id/2/400/400',
    compatible_models: ['Universal'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'LED Headlight Bulbs (H11)',
    slug: 'led-headlight-h11',
    sku: 'LGT-H11-LED',
    description: '6000K Cool White LED bulbs. 300% brighter than halogen. Plug and play installation.',
    price: 89.99,
    stock: 50,
    category_id: 3,
    brand_id: 3, // BMW
    image_url: 'https://picsum.photos/id/3/400/400',
    compatible_models: ['3 Series', '5 Series', 'X5'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Sport Air Filter',
    slug: 'sport-air-filter',
    sku: 'FLT-AIR-SPT',
    description: 'High-flow washable air filter. Increases horsepower and acceleration.',
    price: 55.00,
    stock: 30,
    category_id: 1,
    brand_id: 2, // Honda
    image_url: 'https://picsum.photos/id/4/400/400',
    compatible_models: ['Civic', 'Accord', 'CR-V'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Shock Absorber Rear',
    slug: 'shock-absorber-rear',
    sku: 'SUS-SHK-RR',
    description: 'Gas-charged rear shock absorber for smooth ride and handling stability.',
    price: 75.25,
    stock: 20,
    category_id: 2,
    brand_id: 4, // Ford
    image_url: 'https://picsum.photos/id/5/400/400',
    compatible_models: ['F-150', 'Explorer'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Spark Plug Iridium',
    slug: 'spark-plug-iridium',
    sku: 'SPK-IRD-04',
    description: 'Long-life iridium spark plug. Improved fuel efficiency and acceleration.',
    price: 12.99,
    stock: 200,
    category_id: 1,
    brand_id: 5, // Nissan
    image_url: 'https://picsum.photos/id/6/400/400',
    compatible_models: ['Altima', 'Sentra', 'Rogue'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Alternator 120A',
    slug: 'alternator-120a',
    sku: 'ELEC-ALT-120',
    description: 'Remanufactured 120 Amp Alternator. Tested for voltage stability.',
    price: 145.00,
    stock: 10,
    category_id: 3,
    brand_id: 1, // Toyota
    image_url: 'https://picsum.photos/id/7/400/400',
    compatible_models: ['Camry', 'Highlander'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Exhaust Muffler Tip',
    slug: 'exhaust-tip-chrome',
    sku: 'EXH-TIP-CHR',
    description: 'Stainless steel chrome polished exhaust tip. Bolt-on installation.',
    price: 24.99,
    stock: 60,
    category_id: 4,
    brand_id: 3, // BMW
    image_url: 'https://picsum.photos/id/8/400/400',
    compatible_models: ['Universal'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'Timing Belt Kit',
    slug: 'timing-belt-kit',
    sku: 'ENG-TMG-KIT',
    description: 'Complete timing belt kit with water pump and tensioner.',
    price: 120.50,
    stock: 15,
    category_id: 1,
    brand_id: 2, // Honda
    image_url: 'https://picsum.photos/id/9/400/400',
    compatible_models: ['Civic', 'Pilot'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'Car Battery 12V',
    slug: 'battery-12v-60ah',
    sku: 'ELEC-BAT-60',
    description: 'Maintenance free 12V 60Ah battery with high cold cranking amps.',
    price: 110.00,
    stock: 25,
    category_id: 3,
    brand_id: 4, // Ford
    image_url: 'https://picsum.photos/id/10/400/400',
    compatible_models: ['Focus', 'Fiesta'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

// --- Simulation of Eloquent/Query Builder logic ---

export const getBrands = () => BRANDS;
export const getCategories = () => CATEGORIES;

export const getFeaturedProducts = () => PRODUCTS.filter(p => p.is_featured);

export const getProductById = (id: number) => PRODUCTS.find(p => p.id === id);

export const getProducts = (filter: {
  search?: string;
  category_id?: number | null;
  brand_id?: number | null;
}) => {
  return PRODUCTS.filter(product => {
    let matches = true;

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      matches = matches && (
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.compatible_models.some(m => m.toLowerCase().includes(searchLower))
      );
    }

    if (filter.category_id) {
      matches = matches && product.category_id === filter.category_id;
    }

    if (filter.brand_id) {
      matches = matches && product.brand_id === filter.brand_id;
    }

    return matches;
  });
};
