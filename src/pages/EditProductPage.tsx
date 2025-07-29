import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useFetchProductBySlug } from "../hooks/useFetchProductBySlug";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import { MenuItem } from "@mui/material";
import { STATIC_CATEGORIES } from "../constants/Categories";
import { slugify } from "../utils/slugify";

const EditProductPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useFetchProductBySlug(slug);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: 0,
    description: "",
    images: [""],
    categoryId: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        slug: slugify(product.name),
        price: product.price,
        description: product.description,
        images: product.images,
        categoryId: String(product.category.id),
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!product) return;

    try {
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, {
        ...form,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Product updated!");
      navigate(`/category/${form.categoryId}/${form.slug}`);
    } catch (err) {
      toast.error("Failed to update product.");
      console.error(err);
    }
  };

  if (isLoading || !product) {
    return (
      <MainLayout>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Edit Product
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            sx={{ mb: 2 }}
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={form.price}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={3}
            sx={{ mb: 2 }}
            value={form.description}
            onChange={handleChange}
          />

          <TextField
            label="Image URL"
            name="images"
            fullWidth
            sx={{ mb: 3 }}
            value={form.images[0]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, images: [e.target.value] }))
            }
          />

          <TextField
            select
            label="Category"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {STATIC_CATEGORIES.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ fontWeight: 600 }}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default EditProductPage;
