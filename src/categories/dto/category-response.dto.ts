import { Category } from '@prisma/client';

export class CategoryResponseDto implements Category {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}