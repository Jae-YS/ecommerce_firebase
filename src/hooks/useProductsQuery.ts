import { useQueries } from "@tanstack/react-query";
import useCategoriesQuery from "./useCategoriesQuery";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";

const fetchProductsByCategory = async (categoryId: number) => {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
  );
  return res.json();
};

export default function useProductsQuery() {
  const { data: categories, isLoading: loadingCategories } = useCategoriesQuery();

  const productQueries = useQueries({
    queries: (categories ?? []).map((cat: Category) => ({
      queryKey: ["products", cat.id],
      queryFn: () => fetchProductsByCategory(cat.id),
      staleTime: 5 * 60 * 1000,
      enabled: !!categories,
    })),
  });

  const isLoading =
    loadingCategories ||
    productQueries.length !== (categories?.length || 0) ||
    productQueries.some((q) => q.isLoading || q.isFetching);

  const allProducts: Product[] = productQueries.flatMap((query) =>
    Array.isArray(query.data) ? query.data : []
  );

  const cleanedProducts: Product[] = allProducts
    .sort(
      (a, b) =>
        new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
    )
    .slice(9) // getting rid of incorrect products

  const productsByCategory: Record<number, Product[]> = (categories ?? []).reduce(
    (acc, cat) => {
      acc[cat.id] = cleanedProducts.filter(
        (product) => product.category?.id === cat.id
      );
      return acc;
    },
    {} as Record<number, Product[]>
  );

  return {
    productsByCategory,
    isLoading,
  };
}
