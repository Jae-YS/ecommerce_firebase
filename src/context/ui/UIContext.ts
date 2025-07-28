import { createContext} from "react";

export type UIContextType = {
  isAppLoading: boolean;
  setIsAppLoading: (value: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
};

export const UIContext = createContext<UIContextType | undefined>(undefined);
