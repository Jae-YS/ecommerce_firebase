import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import AutoBreadcrumbs from "../components/AutoBreadCrumbs";
import CartDrawer from "../components/CartDrawer";
import { useUIContext } from "../context/ui/useUIContext";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "../redux/cartSlice";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isCartOpen, setIsCartOpen } = useUIContext();
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(loadCart(user.email));
    }
  }, [dispatch, isAuthenticated, user?.email]);

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Box sx={{ px: 3, mt: 2 }}>
        <AutoBreadcrumbs />
      </Box>

      <Box
        component="main"
        sx={{ bgcolor: "background.default", minHeight: "calc(100dvh - 64px)" }}
      >
        <Container maxWidth="lg">{children}</Container>
        <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Box>
    </>
  );
};

export default MainLayout;
