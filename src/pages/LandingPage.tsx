import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LandingLayout from "../layout/LandingLayout";

const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <Box
        sx={{
          height: "calc(100dvh - 64px)",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 4 },
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
          }}
        >
          Discover Style with Purpose.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            maxWidth: "600px",
            color: "text.secondary",
            fontSize: {
              xs: "1rem",
              sm: "1.125rem",
            },
          }}
        >
          Thoughtfully crafted. Sustainably made. Curated by Lunava for those
          who care what they wear.
        </Typography>

        <Button
          component={Link}
          to="/home"
          variant="contained"
          size="large"
          sx={{
            px: { xs: 3, sm: 5 },
            py: 1.5,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            textTransform: "none",
            borderRadius: 999,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "340px", sm: "unset" },
            "&:hover": {
              backgroundColor: "#914D2F",
            },
          }}
        >
          Explore the Collection
        </Button>
      </Box>
    </LandingLayout>
  );
};

export default LandingPage;
