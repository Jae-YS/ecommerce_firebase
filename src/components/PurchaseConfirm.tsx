import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type PurchaseConfirmProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const PurchaseConfirm: React.FC<PurchaseConfirmProps> = ({
  open,
  title = "Confirm Checkout",
  description = "Are you sure you want to place your order and clear the cart?",
  confirmLabel = "Yes, Checkout",
  cancelLabel = "Cancel",
  onClose,
  onConfirm,
}) => {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.25rem" },
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <DialogContentText
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: "1.5rem",
              sm: "1.25rem",
              md: "1.125rem",
              lg: "1rem",
            },
          }}
        >
          {description}
        </DialogContentText>
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
          {cancelLabel}
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
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseConfirm;
