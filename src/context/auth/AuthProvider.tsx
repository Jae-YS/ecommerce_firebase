import React, { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../ui/useUIContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setIsAppLoading } = useUIContext();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAppLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      setIsAppLoading(false);

      if (firebaseUser) {
        const currentPath = location.pathname;
        const shouldRedirect =
          currentPath === "/" || currentPath === "/auth" || currentPath === "";

        if (shouldRedirect) {
          navigate("/home", { replace: true });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, setIsAppLoading]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
