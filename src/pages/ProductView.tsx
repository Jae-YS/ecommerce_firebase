import { Box, Button, Typography, CardMedia } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductBySlug } from "../hooks/useFetchProductBySlug";
import { useUIContext } from "../context/ui/useUIContext";
import ConfirmModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useAuthContext } from "../context/auth/useAuthContext";
const ProductDetailPage = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const productSlug = useParams<{ slug: string }>().slug ?? "";
  const { data: product, isLoading } = useFetchProductBySlug(productSlug);
  const { setIsAppLoading } = useUIContext();
  const prev = useRef<boolean | null>(null);

  useEffect(() => {
    if (prev.current === null || prev.current !== isLoading) {
      prev.current = isLoading;
      setIsAppLoading(isLoading);
    }
  }, [isLoading, setIsAppLoading]);

  if (isLoading || !product) {
    return null;
  }

  const formattedDate = new Date(product.creationAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleAddToCart = () => {
    if (!user?.email) return;
    dispatch(addToCart({ product, email: user.email }));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    setOpenConfirm(true);
  };

  const confirmPurchase = () => {
    setOpenConfirm(false);
    toast.success("Purchase successful!");
    navigate("/home");
  };

  return (
    <MainLayout>
      <Box sx={{ px: 2, py: 3, backgroundColor: "background.default" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "background.default",
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {product.title}
            </Typography>

            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                {product.category.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Created on: {formattedDate}
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 2, color: "error.main" }}>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
              {product.description}
            </Typography>

            <Box
              sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Button
                variant="outlined"
                onClick={handleAddToCart}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "#914D2F",
                  },
                }}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmPurchase}
        productTitle={product.title}
        price={product.price}
      />
    </MainLayout>
  );
};

export default ProductDetailPage;
