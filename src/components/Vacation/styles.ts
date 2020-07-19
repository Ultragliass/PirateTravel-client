import { makeStyles } from "@material-ui/core";

export const useVacationStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  text: {
    marginBottom: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
  },
}));
