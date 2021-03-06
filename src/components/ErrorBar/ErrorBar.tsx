import React from "react";
import { Snackbar } from "@material-ui/core";

import { Alert } from "@material-ui/lab";

interface ErrorBarProps {
  error: null | string;
  dismissError(): void;
}

export function _ErrorBar(props: ErrorBarProps) {
  const { error, dismissError } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(error)}
      autoHideDuration={2000}
      onClose={dismissError}
    >
      <Alert onClose={dismissError} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
