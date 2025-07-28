import { UIProvider } from "../context/ui/UIProvider";
import { AuthProvider } from "../context/auth/AuthProvider";
import { Provider } from "react-redux";
import { store } from "../store";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <UIProvider>
      <Provider store={store}>{children}</Provider>
    </UIProvider>
  </AuthProvider>
);
