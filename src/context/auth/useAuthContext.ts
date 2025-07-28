import { useContext } from "react";
import { type AuthContextType, AuthContext } from "./AuthContext";

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUIContext must be used within UIProvider");
  return context;
};
