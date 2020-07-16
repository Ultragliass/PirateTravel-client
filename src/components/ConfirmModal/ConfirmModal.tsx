import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

interface ConfirmModalProps {
  open: boolean;
  handleClose(): void;
  handleConfirm(): void;
  title: string;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { open, handleClose, handleConfirm, title } = props;

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
