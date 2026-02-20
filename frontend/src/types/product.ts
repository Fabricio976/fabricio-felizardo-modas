export interface Product {
  id: string; 
  name: string;
  brand: string;
  category: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  price: number; 
  image: string; 
  hoverImage?: string;
  sizes: string[]; 
  stock: number;
  description: string;
  material: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
}