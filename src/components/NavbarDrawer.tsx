import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { removeFromSessionStorage } from "../utils/sessionStorage";
import { STATIC_CATEGORIES } from "../constants/Categories";
import { type RootState } from "../store";
import NavLinkButton from "./NavLinkButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const NavbarDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const isAuthenticated = !!user;

  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogin = () => {
    setDrawerOpen(false);
    navigate("/auth");
  };

  const handleLogout = async () => {
    if (user?.email) {
      removeFromSessionStorage(`cart:${user.email}`);
    }
    dispatch(clearCart());
    await signOut(auth);
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          <Typography variant="h6" sx={{ mb: 2 }}>
            LUNAVA
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: { xs: 1, md: 2 },
              flexShrink: 1,
              my: 2,
            }}
          >
            <NavLinkButton
              key={"All Products"}
              to={`/home`}
              label={"All Products"}
            />
            {STATIC_CATEGORIES.map((cat) => (
              <NavLinkButton
                key={cat.id}
                to={`/category/${cat.id}`}
                label={cat.name}
              />
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/cart"
                onClick={toggleDrawer(false)}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  <ShoppingCartIcon />
                </Badge>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>

            {isAuthenticated && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/profile"
                    onClick={toggleDrawer(false)}
                  >
                    <AccountCircleIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/products/new"
                    onClick={toggleDrawer(false)}
                  >
                    <AddBoxIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Add Product" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>

          <Divider sx={{ my: 2 }} />

          {isAuthenticated ? (
            <Button onClick={handleLogout} fullWidth variant="outlined">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} fullWidth variant="contained">
              Log In
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
