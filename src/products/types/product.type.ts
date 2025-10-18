export enum PRODUCT_CATEGORIES {
  SMARTPHONE = 'smartphone',
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  TV = 'tv',
  ACCESSORY = 'accessory',
  OTHER = 'other',
}

export type ProductCategory =
  | PRODUCT_CATEGORIES.SMARTPHONE
  | PRODUCT_CATEGORIES.LAPTOP
  | PRODUCT_CATEGORIES.TABLET
  | PRODUCT_CATEGORIES.TV
  | PRODUCT_CATEGORIES.ACCESSORY
  | PRODUCT_CATEGORIES.OTHER;

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  finalPrice: number;
  category: ProductCategory;
  features: string[];
  images?: string[];
  stock?: number;
  brand?: string;
  createdAt: string;
  updatedAt: string;
}