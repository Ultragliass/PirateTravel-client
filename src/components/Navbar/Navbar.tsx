import { useNavbarStyles } from "./styles";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
} from "@material-ui/core";
import {
  Search,
  ExitToApp,
  AssignmentInd,
  Equalizer,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { IUser } from "../../models/user";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userData: null | IUser;
}

export function _Navbar(props: NavbarProps) {
  const classes = useNavbarStyles();
  const { isLoggedIn, isAdmin, userData } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            color="textPrimary"
            className={classes.title}
            variant="h6"
            noWrap
          >
            {!userData ? "Welcome!" : `Hello, ${userData.username}!`}
          </Typography>
          {isLoggedIn ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          ) : (
            <>
              <Link to="/">
                <IconButton edge="end" className={classes.button}>
                  <ExitToApp />
                </IconButton>
              </Link>

              <Link to="/register">
                <IconButton edge="end" className={classes.button}>
                  <AssignmentInd />
                </IconButton>
              </Link>
            </>
          )}

          {isLoggedIn && isAdmin ? (
            <IconButton edge="end" className={classes.button}>
              <Equalizer />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
