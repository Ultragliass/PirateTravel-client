import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface ErrorBarProps {
  message: null | string;
  dismissError(): void;
}

export function _MessageBar(props: ErrorBarProps) {
  const { message, dismissError } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(message)}
      autoHideDuration={2000}
      onClose={dismissError}
    >
      <Alert onClose={dismissError} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
