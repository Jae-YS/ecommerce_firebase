import { Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

type NavLinkButtonProps = {
  to: string;
  label: string;
  isActive?: boolean;
};

const NavLinkButton = ({ to, label, isActive }: NavLinkButtonProps) => {
  const location = useLocation();
  const active = isActive ?? location.pathname === to;

  return (
    <Button
      component={RouterLink}
      to={to}
      disableRipple
      color="inherit"
      sx={{
        position: "relative",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "1rem",
        minWidth: "auto",
        paddingX: 0,
        color: active ? "primary.main" : "text.primary",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.main",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 4,
          left: 0,
          height: "2px",
          width: active ? "100%" : 0,
          backgroundColor: "primary.main",
          transition: "width 0.3s ease",
        },
        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default NavLinkButton;
