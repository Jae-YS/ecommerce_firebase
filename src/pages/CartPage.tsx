import {
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Button,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../layout/MainLayout";
import type { Product } from "../types/Product";
import PurchaseConfirm from "../components/PurchaseConfirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUIContext } from "../context/ui/useUIContext";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";
import { type RootState } from "../store";
import { useAuthContext } from "../context/auth/useAuthContext";
const CartPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const userEmail = user?.email;
  const items = useSelector((state: RootState) => state.cart.items);

  const { setIsCartOpen } = useUIContext();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast.success("Checkout successful!");
    dispatch(clearCart());
    setConfirmOpen(false);
    setIsCartOpen(false);
    navigate("/");
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          px: { xs: 1.5, sm: 3, md: 4 },
          py: 4,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              My Cart
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              {items.map((item: Product) => (
                <Box key={item.id} sx={{ width: "100%" }}>
                  <Box
                    display="flex"
                    gap={2}
                    sx={{
                      width: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      component="img"
                      src={item.images?.[0]}
                      alt={item.title}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 1,
                        flexShrink: 0,
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        gap={1}
                      >
                        <Typography
                          fontWeight={500}
                          fontSize="0.95rem"
                          sx={{ flexGrow: 1 }}
                        >
                          {item.title}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(
                              removeFromCart({
                                productId: item.id,
                                email: userEmail ?? "",
                              })
                            )
                          }
                          sx={{ p: 0.5, color: "text.secondary" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" mt={0.5}>
                        ${item.price.toFixed(2)}
                      </Typography>

                      <Box
                        display="flex"
                        alignItems="center"
                        mt={1}
                        border="1px solid"
                        borderColor="grey.400"
                        borderRadius={1}
                        width="fit-content"
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
                          sx={{ p: 0.5 }}
                        >
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        <Typography px={1.5} fontSize="0.875rem">
                          {item.quantity}
                        </Typography>
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
                          sx={{ p: 0.5 }}
                        >
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </Box>

                      <Typography fontWeight={600} mt={1}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: 300 },
              flexShrink: 0,
              mt: { xs: 4, md: 0 },
              position: { md: "sticky" },
              top: { md: 100 },
            }}
          >
            <Typography variant="h6" mb={2}>
              Order Summary
            </Typography>
            <Divider />

            <Box
              display="flex"
              justifyContent="space-between"
              my={2}
              flexWrap="wrap"
              rowGap={1}
            >
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Link href="#" underline="hover" fontSize={14}>
              Estimate Delivery
            </Link>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
              rowGap={1}
            >
              <Typography fontWeight={500}>Total</Typography>
              <Typography fontWeight={500}>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setConfirmOpen(true)}
              sx={{
                backgroundColor: "#A85E3B",
                color: "#fff",
                py: 1.5,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                borderRadius: 2,
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

            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              display="block"
              mt={2}
            >
              Secure Checkout
            </Typography>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default CartPage;
