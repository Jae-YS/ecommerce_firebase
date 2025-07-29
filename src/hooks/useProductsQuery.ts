import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Product } from "../types/Product";

export default function useProductsQuery() {
  const productsQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          creationAt: data.creationAt,
          updatedAt: data.updatedAt,
          images: Array.isArray(data.images) ? data.images : [],
          category: {
            id: data.category?.id || "",
            name: data.category?.name || "",
          },
        };
      }) as Product[];

      return products.sort(
        (a, b) =>
          new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = productsQuery.data ?? [];

  const categories = Array.from(
    new Map(products.map((p) => [p.category.id, p.category])).values()
  );

  const productsByCategory = products.reduce((acc, product) => {
    const catId = product.category?.id ?? "uncategorized";
    acc[catId] = acc[catId] || [];
    acc[catId].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return {
    categories,
    products,
    productsByCategory,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
  };
}
