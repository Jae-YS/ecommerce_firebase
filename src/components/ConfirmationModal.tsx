import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productTitle: string;
  price: number;
};

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  productTitle,
  price,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: isMobile ? 0 : 2,
            display: "flex",
            flexDirection: "column",
            p: 2,
            boxShadow: 6,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.25rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        Confirm Purchase
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.25rem",
              md: "1.125rem",
              lg: "1rem",
            },
            color: "text.secondary",
          }}
        >
          Are you sure you want to purchase{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
            {productTitle}
          </Box>{" "}
          for{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
            ${price.toFixed(2)}
          </Box>
          ?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 3 : 1.5,
          mt: "auto",
          pt: 2,
          px: 0,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            fontWeight: 700,
            borderRadius: 999,
            px: 4,
            py: 1.25,
            fontSize: "0.875rem",
            textTransform: "uppercase",
            color: "text.primary",
            borderColor: "text.primary",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          fullWidth
          sx={{
            fontWeight: 700,
            borderRadius: 999,
            px: 4,
            py: 1.25,
            fontSize: "0.875rem",
            textTransform: "uppercase",
            backgroundColor: "#FF6A33",
            color: "#fff",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#e55a28",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
