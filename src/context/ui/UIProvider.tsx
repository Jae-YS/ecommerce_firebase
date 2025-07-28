import React, { useState } from "react";
import { UIContext } from "./UIContext";

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{ isAppLoading, setIsAppLoading, isCartOpen, setIsCartOpen }}
    >
      {children}
    </UIContext.Provider>
  );
};
