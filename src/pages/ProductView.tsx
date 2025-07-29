import { Box, Button, Typography, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useFetchProductBySlug } from "../hooks/useFetchProductBySlug";
import { useUIContext } from "../context/ui/useUIContext";
import ConfirmModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useAuthContext } from "../context/auth/useAuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createOrder } from "../hooks/useCreateOrder";

const ProductDetailPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useFetchProductBySlug(slug);
  const { user } = useAuthContext();
  const { setIsAppLoading } = useUIContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const isOwner = user?.email === product?.createdBy?.email;
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIsAppLoading(isLoading || deleting);
  }, [isLoading, deleting, setIsAppLoading]);

  if (isLoading || !product) return null;

  const handleDelete = async () => {
    if (!product?.id) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirm) return;

    try {
      setDeleting(true);
      await deleteDoc(doc(db, "products", product.id));
      toast.success("Product deleted.");
      navigate("/home");
    } catch (err) {
      toast.error("Failed to delete product.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = new Date(product.creationAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleAddToCart = () => {
    if (!user?.email)
      return toast.error("You must be logged in to add to cart");
    dispatch(addToCart({ product, email: user.email }));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!user?.email) return toast.error("You must be logged in to buy");
    setOpenConfirm(true);
  };

  const confirmPurchase = async () => {
    if (!user || !product || !user.email) {
      toast.error("Missing user or product info.");
      return;
    }

    try {
      const userForOrder = {
        id: user.uid,
        displayName: user.displayName ?? "",
        email: user.email ?? "",
      };
      await createOrder(userForOrder, [product]);
      toast.success("Purchase successful!");
      setOpenConfirm(false);
      navigate("/home");
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to complete order");
    }
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
              image={product.images?.[0] || ""}
              alt={product.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "background.default",
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>

              {isOwner && (
                <>
                  <EditIcon
                    onClick={() => navigate(`/update-product/${product.slug}`)}
                    sx={{
                      fontSize: 22,
                      cursor: "pointer",
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  />
                  <DeleteIcon
                    onClick={handleDelete}
                    sx={{
                      fontSize: 22,
                      cursor: "pointer",
                      color: "text.secondary",
                      "&:hover": {
                        color: "error.main",
                      },
                    }}
                  />
                </>
              )}
            </Box>

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
              <Typography variant="subtitle2">
                {product.category.name}
              </Typography>
              <Typography variant="body2">
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
                onClick={handleBuyNow}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "#914D2F",
                  },
                }}
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
        productTitle={product.name}
        price={product.price}
      />
    </MainLayout>
  );
};

export default ProductDetailPage;
