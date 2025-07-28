export type ProductFilterState = {
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "date-desc" | "date-asc" | "name-asc" | "name-desc" | "price-asc" | "price-desc";
};