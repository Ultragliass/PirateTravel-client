import { makeStyles } from "@material-ui/core";

export const useLoadingStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "black",
    },
  }));