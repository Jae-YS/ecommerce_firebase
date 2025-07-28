import { useContext } from "react";
import { type UIContextType, UIContext } from "./UIContext";

export const useUIContext = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUIContext must be used within UIProvider");
  return context;

};
