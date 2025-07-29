import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuthContext } from "../context/auth/useAuthContext";
import type { User } from "../types/User";

export interface FetchedUser extends User {
  createdAt?: number;
}

export default function useFetchUser() {
  const { user } = useAuthContext();
  const uid = user?.uid;

  return useQuery<FetchedUser | null>({
    queryKey: ["userProfile", uid],
    enabled: !!uid,
    queryFn: async () => {
      if (!uid) return null;

      try {
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);

        if (!snap.exists()) return null;

        const data = snap.data();

        return data as FetchedUser;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}
