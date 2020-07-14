import { makeStyles } from "@material-ui/core";

export const useStatisticsPageStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "#fff",
  },
  buttons: {
    marginTop: theme.spacing(4),
    textDecoration: "none",
  },
  button: {
    width: 64,
    height: 64,
    padding: 0,
  },
}));
