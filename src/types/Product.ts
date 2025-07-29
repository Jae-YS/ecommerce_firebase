import type { Category } from "./Category";
import type { User } from "./User";
export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string | Date;
  updatedAt: string | Date;
  createdBy: User;
  quantity: number;
};
