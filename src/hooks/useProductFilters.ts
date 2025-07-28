import { useMemo } from "react";
import type { Product } from "../types/Product";
import type { ProductFilterState } from "../types/ProductFilterState";

export const useFilteredProducts = (
  products: Product[],
  category: string | undefined,
  filters: ProductFilterState | null
) => {
  return useMemo(() => {
    let result = [...products];

    if (category && category !== "All Products") {
      result = result.filter((p) => p.category?.name === category);
    }

    const min = filters?.minPrice ?? 0;
    const max = filters?.maxPrice ?? Infinity;

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    switch (filters?.sortBy) {
      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
        );
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [products, category, filters]);
};
