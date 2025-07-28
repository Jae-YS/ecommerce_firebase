import { useMemo } from "react";
import type { Product } from "../types/Product";

export const useVisibleProducts = (
  products: Product[],
  visibleCount: number
) => {
  return useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
};
