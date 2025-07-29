import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Product } from "../types/Product";

const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.docs[0];
  const data = doc.data();

  const product: Product = {
    id: doc.id,
    name: data.name,
    slug: data.slug,
    price: data.price,
    quantity: data.quantity,
    description: data.description,
    images: Array.isArray(data.images) ? data.images : [],
    category: {
      id: data.category?.id || "",
      name: data.category?.name || "",
    },
    creationAt: data.creationAt,
    createdBy: data.createdBy,
    updatedAt: data.updatedAt,
  };

  return product;
};

export const useFetchProductBySlug = (slug: string) => {
  return useQuery<Product | null>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};
