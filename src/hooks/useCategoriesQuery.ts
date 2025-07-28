import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types/Category";

export default function useCategoriesQuery() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        const filtered = data.filter((cat: Category) =>
          [
            "clothes",
            "electronics",
            "furniture",
            "shoes",
            "miscellaneous",
          ].includes(cat.name.toLowerCase())
        );


        return filtered;
      } catch (err) {
        console.error("Query failed:", err);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
