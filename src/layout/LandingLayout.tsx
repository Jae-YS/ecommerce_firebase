import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{ bgcolor: "background.default", minHeight: "calc(100dvh - 64px)" }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
};

export default LandingLayout;
