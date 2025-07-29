import { UIProvider } from "../context/ui/UIProvider";
import { AuthProvider } from "../context/auth/AuthProvider";
import { Provider } from "react-redux";
import { store } from "../store";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <UIProvider>
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
    </AuthProvider>
  </UIProvider>
);
