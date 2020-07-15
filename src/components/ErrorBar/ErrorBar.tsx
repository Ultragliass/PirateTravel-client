import React from "react";
import { Snackbar, IconButton, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface ErrorBarProps {
  error: any;
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
      message={error}
      action={
        <Tooltip title="Dismiss">
          <IconButton size="small" color="inherit" onClick={dismissError}>
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    ></Snackbar>
  );
}
