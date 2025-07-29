import type { Product } from "./Product";
import type { User } from "./User";

export interface Order {
  id: string;
  user: User;
  products: Product[];

  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
