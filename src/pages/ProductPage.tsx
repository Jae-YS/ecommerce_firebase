import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import useProductsQuery from "../hooks/useProductsQuery";
import { useUIContext } from "../context/ui/useUIContext";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import type { Product } from "../types/Product";
import type { ProductFilterState } from "../types/ProductFilterState";
import { useFilteredProducts } from "../hooks/useProductFilters";
import { useVisibleProducts } from "../hooks/useVisibleProducts";
import { STATIC_CATEGORIES } from "../constants/Categories";

const INITIAL_VISIBLE_COUNT = 16;

const CATEGORY_MAP = Object.fromEntries(
  STATIC_CATEGORIES.map((cat) => [cat.id, cat.name])
);

const ProductsPage: React.FC = () => {
  const { id: categoryId } = useParams<{ id?: string }>();
  const { productsByCategory, isLoading } = useProductsQuery();

  const { setIsAppLoading } = useUIContext();
  const [filters, setFilters] = useState<ProductFilterState | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setIsAppLoading(isLoading);
  }, [isLoading, setIsAppLoading]);

  const handleApplyFilters = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const categoryName =
    categoryId !== undefined ? CATEGORY_MAP[categoryId] : undefined;
  const pageTitle = categoryName ?? "All Products";

  const allProducts =
    categoryId !== undefined
      ? productsByCategory?.[categoryId] ?? []
      : Object.values(productsByCategory).flat();

  const filteredProducts = useFilteredProducts(allProducts, pageTitle, filters);
  const visibleProducts = useVisibleProducts(filteredProducts, visibleCount);

  if (isLoading) return null;

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            fontWeight: 500,
            color: "text.primary",
            textTransform: "uppercase",
            textAlign: "center",
            fontSize: {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          {pageTitle}
        </Typography>

        <FilterBar onApply={handleApplyFilters} />

        {visibleProducts.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            <Typography variant="h6">No products found</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              columnGap: 3,
              rowGap: 4,
            }}
          >
            {visibleProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}

        {visibleCount < filteredProducts.length && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: { xs: 3, sm: 4 },
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 500,
              textTransform: "none",
              width: { xs: "100%", sm: "fit-content" },
              mx: "auto",
              mt: 4,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: "none",
              },
            }}
            onClick={() => setVisibleCount((prev) => prev + 8)}
          >
            Load More
          </Button>
        )}
      </Box>
    </MainLayout>
  );
};

export default ProductsPage;
