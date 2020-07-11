import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useLoadingStyles } from "./styles";

interface LoadingProps {
  isLoading: boolean;
}

export function _Loading(props: LoadingProps) {
  const { isLoading } = props;

  const classes = useLoadingStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
