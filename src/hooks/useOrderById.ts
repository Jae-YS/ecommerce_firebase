import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Order } from "../types/Order";

export const useOrderById = (orderId?: string) => {
  return useQuery<Order>({
    queryKey: ["order", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      if (!orderId) throw new Error("Missing order ID");

      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) throw new Error("Order not found");

      const data = docSnap.data() as Omit<Order, "id">;
      return { id: docSnap.id, ...data };
    },
    staleTime: 1000 * 60 * 5,
  });
};
