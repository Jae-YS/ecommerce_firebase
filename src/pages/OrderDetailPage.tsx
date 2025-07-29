import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useUIContext } from "../context/ui/useUIContext";
import { useOrderById } from "../hooks/useOrderById";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsAppLoading } = useUIContext();
  const { data: order, isLoading, isError } = useOrderById(id);

  useEffect(() => {
    setIsAppLoading(isLoading);
  }, [isLoading, setIsAppLoading]);

  if (isLoading || isError || !order) return null;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, px: 3 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Order Details
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="subtitle1">
          <strong>Order ID:</strong> {order.id}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" mb={2}>
          <strong>Total:</strong> ${order.total.toFixed(2)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Products
        </Typography>
        <List disablePadding>
          {order.products.map((product, index) => (
            <ListItem key={index} disableGutters sx={{ py: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography fontWeight={500}>
                    {product.name} (x{product.quantity || 1})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)} each
                  </Typography>
                </Box>
                <Typography fontWeight={600}>
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Button
          sx={{ mt: 3 }}
          onClick={() => navigate(-1)}
          variant="outlined"
          color="primary"
        >
          Back to Profile
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderDetailPage;
