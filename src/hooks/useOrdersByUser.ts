import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Order } from "../types/Order";

export const useOrdersByUser = (email: string) => {
  return useQuery<Order[]>({
    queryKey: ["orders", email],
    enabled: !!email,
    queryFn: async () => {
      const q = query(
        collection(db, "orders"),
        where("user.email", "==", email)
      );
      const snap = await getDocs(q);

      return snap.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Order;
      });
    },
    staleTime: 1000 * 60 * 5,
  });
};
