export type TemperamentType = 'warm' | 'warm_wet' | 'cold' | 'cold_wet' | 'moderate';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  products_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  english_name: string;
  slug: string;
  short_description: string;
  description: string;
  ingredients: string;
  benefits: string;
  usage_method: string;
  warnings?: string;
  temperament: TemperamentType;
  caffeine_free: boolean;
  weight: number;
  price: number;
  discount_price?: number | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  sales_count: number;
  rating_average: number;
  review_count: number;
  category: Category;
  tags: Tag[];
  images: { id: number; url: string; alt_text: string }[];
  color_accent: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Address {
  id: number;
  title: string;
  receiver_name: string;
  receiver_phone: string;
  province: string;
  city: string;
  address_line: string;
  postal_code: string;
  is_default: boolean;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  product_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  product_slug?: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  status_display: string;
  receiver_name: string;
  receiver_phone: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  shipping_note?: string;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  items: OrderItem[];
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  reading_time: number;
  category_name: string;
  author_name: string;
  views_count: number;
  created_at: string;
  image_color: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar?: string;
}
