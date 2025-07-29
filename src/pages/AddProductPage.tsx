import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { STATIC_CATEGORIES } from "../constants/Categories";
import { toast } from "react-toastify";
import { slugify } from "../utils/slugify";
import { useAuthContext } from "../context/auth/useAuthContext";

const AddProductPage = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  if (!user) {
    toast.error("You must be logged in to add a product.");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, price, description, category, image } = form;

    if (!name || !price || !description || !category || !image) {
      toast.error("Please fill out all fields.");
      return;
    }

    const now = Timestamp.now().toMillis();

    try {
      await addDoc(collection(db, "products"), {
        name,
        slug: slugify(name),
        price: parseFloat(price),
        description,
        category: {
          id: Number(category),
          name: STATIC_CATEGORIES.find((c) => c.id === Number(category))?.name,
        },
        images: [`https://placehold.co/600x400/png?text=${image}`],
        creationAt: now,
        updatedAt: now,
        quantity: 1, // or let the user choose
        createdBy: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        },
      });

      toast.success("Product added successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Try again.");
    }
  };
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        textAlign="center"
        fontWeight={600}
        fontSize={{ xs: "1.8rem", sm: "2rem" }}
      >
        Add Product
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
        >
          {STATIC_CATEGORIES.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ py: 1.5, fontWeight: 600 }}
        >
          Create Product
        </Button>
      </Stack>
    </Box>
  );
};

export default AddProductPage;
