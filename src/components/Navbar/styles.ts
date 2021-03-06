import { makeStyles, Theme, createStyles, fade } from "@material-ui/core";

export const useNavbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      flexGrow: 1,
      visibility: "hidden",
      [theme.breakpoints.up("sm")]: {
        visibility: "visible",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.5),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.75),
      },
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      color: "black",
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    appBar: {
      backgroundColor: "#fff",
    },
    button: {
      marginLeft: theme.spacing(3),
    },
    input: {
      color: "#000",
      border: "2px solid gray",
      borderRadius: 5,
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    link: {
      textDecoration: "none",
    },
  })
);
