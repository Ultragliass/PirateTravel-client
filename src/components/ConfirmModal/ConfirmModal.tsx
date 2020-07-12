import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

interface ConfirmModalProps {
  open: boolean;
  handleClose(): void;
  deleteVacation(): void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { open, handleClose, deleteVacation } = props;

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog fullScreen={fullscreen} open={open} onClose={handleClose}>
        <DialogTitle>Delete vacation?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteVacation} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
