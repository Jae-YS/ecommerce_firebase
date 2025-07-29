import { useMemo } from "react";
import type { Product } from "../types/Product";

export const useVisibleProducts = (
  products: Product[],
  visibleCount: number
) => {
  return useMemo(() => {
    const sorted = [...products].sort(
      (a, b) =>
        new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
    );

    return sorted.slice(0, visibleCount);
  }, [products, visibleCount]);
};
