export class ProductResponseDto {
  id: number;
  title: string;
  price: number;
  description: string | null;
  image: string | null;
  discount: number;
  finalPrice: number;
  categories: string[];
  rating: {
    rate: number;
    count: number;
  };
}