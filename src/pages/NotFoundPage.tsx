import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, color: "text.primary" }}
        gutterBottom
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ color: "text.secondary", mb: 2 }}>
        Oops! Page not found.
      </Typography>

      <Typography sx={{ color: "text.secondary", maxWidth: 400, mb: 4 }}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          textTransform: "none",
          px: 3,
          py: 1,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#914D2F",
          },
        }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
