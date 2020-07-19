import { makeStyles } from "@material-ui/core";

export const useCommentStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
  },
  cardContent: {
    flexGrow: 1,
  },
}));
