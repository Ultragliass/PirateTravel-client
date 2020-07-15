import { HideOnScroll } from "../HideOnScroll/HideOnScroll";
import { useNavbarStyles } from "./styles";
import React from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import {
  Search,
  ExitToApp,
  AssignmentInd,
  Equalizer,
  MeetingRoom,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  logoutUser(): void;
}

export function _Navbar(props: NavbarProps) {
  const classes = useNavbarStyles();
  const { isLoggedIn, isAdmin, logoutUser } = props;

  const handleUserLogout = () => {
    logoutUser();
  };

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="body1" className={classes.logo} noWrap>
              <img src="/images/logo.png" alt="logo" style={{ width: 50 }} />
            </Typography>
            {isLoggedIn ? (
              <>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <Search />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.input,
                    }}
                  />
                </div>

                <Link to="/">
                  <Tooltip title="Logout">
                    <IconButton
                      edge="end"
                      className={classes.button}
                      onClick={handleUserLogout}
                    >
                      <MeetingRoom />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <Tooltip title="Login">
                    <IconButton edge="end" className={classes.button}>
                      <ExitToApp />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link to="/register">
                  <Tooltip title="Register">
                    <IconButton edge="end" className={classes.button}>
                      <AssignmentInd />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            )}

            {isLoggedIn && isAdmin ? (
              <Link to="/statistics">
                <Tooltip title="Statistics">
                  <IconButton edge="end" className={classes.button}>
                    <Equalizer />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : null}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}
