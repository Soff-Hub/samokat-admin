import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({errorData, open, setOpen, handleDelete }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    handleDelete?.();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          O'chirishni tasdiqlang
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorData ? errorData : " Bu amalni ortga qaytarishni iloji yo'q"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Bekor qilish
          </Button>
          <Button onClick={onDelete} autoFocus>
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
