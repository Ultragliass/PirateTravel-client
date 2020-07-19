import { makeStyles } from "@material-ui/core";

export const useCommentsPageStyles = makeStyles((theme) => ({
  root: {
    minHeight: "105vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  container: {
    maxHeight: 600,
    overflowY: "scroll",
    marginTop: theme.spacing(1),
  },
}));
