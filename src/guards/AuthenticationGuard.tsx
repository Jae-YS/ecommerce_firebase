import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth/useAuthContext";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component: Component,
}) => {
  const { user } = useAuthContext();
  return user ? <Component /> : <Navigate to="/login" />;
};

export default AuthenticationGuard;
