export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'sofas' | 'tables' | 'custom';
  dimensions: string;
  image: string;
  badge?: string;
  features: string[];
}

export interface CustomOrderData {
  type: string;
  length: string;
  width: string;
  height: string;
  finish: string;
  note: string;
  name: string;
  phone: string;
}