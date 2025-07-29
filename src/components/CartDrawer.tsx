import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import PurchaseConfirm from "./PurchaseConfirm";
import { useUIContext } from "../context/ui/useUIContext";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import { type RootState } from "../store";
import { useAuthContext } from "../context/auth/useAuthContext";
import { createOrder } from "../hooks/useCreateOrder";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const userEmail = user?.email;
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { setIsCartOpen } = useUIContext();

  const handleCheckout = async () => {
    if (!user || !user.email) {
      toast.error("You must be logged in to checkout.");
      return;
    }

    try {
      const userForOrder = {
        id: user.uid,
        displayName: user.displayName ?? "",
        email: user.email ?? "",
      };
      await createOrder(userForOrder, items);
      toast.success("Checkout successful!");
      dispatch(clearCart());
      setIsCartOpen(false);
      setConfirmOpen(false);
      navigate("/home");
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to complete order");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Cart ({items.length} item{items.length !== 1 && "s"})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length > 0 && <Divider sx={{ my: 2 }} />}

        <Stack spacing={3}>
          {items.map((item: Product) => (
            <Box key={item.id} display="flex" gap={2}>
              <Box
                component="img"
                src={item.images?.[0]}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <Box flexGrow={1}>
                <Typography fontWeight={500}>{item.name}</Typography>
                <Typography color="text.secondary" fontSize={14}>
                  ${item.price.toFixed(2)}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  border="1px solid"
                  borderColor="grey.400"
                  borderRadius={1}
                  width="fit-content"
                  mt={1}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          productId: item.id,
                          email: userEmail ?? "",
                        })
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                  <Typography px={1}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      dispatch(
                        incrementQuantity({
                          productId: item.id,
                          email: userEmail ?? "",
                        })
                      )
                    }
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>

              <IconButton
                sx={{
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                  p: 1,
                  borderRadius: 1,
                }}
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      productId: item.id,
                      email: userEmail ?? "",
                    })
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight={500}>Subtotal</Typography>
          <Typography fontWeight={500}>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Taxes and shipping are calculated at checkout.
        </Typography>

        <Stack spacing={2} mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setConfirmOpen(true)}
            sx={{
              backgroundColor: "#A85E3B",
              color: "#fff",
              "&:hover": { backgroundColor: "#914D2F" },
            }}
          >
            Checkout
          </Button>

          <PurchaseConfirm
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleCheckout}
            title="Confirm Checkout"
            description="Are you sure you want to place your order and clear the cart?"
            confirmLabel="Yes, Checkout"
          />
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
          >
            View Cart
          </Button>
        </Stack>

        <Typography
          textAlign="center"
          mt={2}
          variant="caption"
          color="text.secondary"
        >
          Secure Checkout
        </Typography>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
