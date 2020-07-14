import { makeStyles } from "@material-ui/core";

export const useVacationPageStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  text: {
    color: "#fff",
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
  icon: {
    width: 64,
    height: 64,
    color: "#fff"
  },
}));
