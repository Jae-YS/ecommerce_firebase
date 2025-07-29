import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { User } from "../types/User";
import type { Product } from "../types/Product";

export const createOrder = async (user: User, cartProducts: Product[]) => {
  const sanitizedProducts = cartProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    quantity: p.quantity || 1,
    images: p.images?.filter(Boolean) ?? [],
  }));

  const total = sanitizedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderData = {
    user: {
      id: user.id,
      name: user.displayName || "",
      email: user.email,
    },
    products: sanitizedProducts,
    total,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, "orders"), orderData);
  return docRef.id;
};
