import { Box, CardMedia, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      onClick={() => {
        navigate(`/category/${product.category.id}/${product.slug}`);
      }}
      sx={{
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 280,
          overflow: "hidden",
          "&:hover .view": {
            transform: "translateY(0)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "background.default",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />

        {!isMobile && (
          <Box
            className="view"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 40,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              transform: "translateY(100%)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            View
          </Box>
        )}
      </Box>

      <Box sx={{ px: 0.5 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            color: "text.primary",
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "error.main",
            fontSize: { xs: "0.9rem", sm: "0.95rem" },
            mt: 0.5,
          }}
        >
          ${product.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
