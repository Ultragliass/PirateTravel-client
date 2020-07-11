import { useNavbarStyles } from "./styles";
import React from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  Search,
  ExitToApp,
  AssignmentInd,
  Equalizer,
  MeetingRoom,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { HideOnScroll } from "../HideOnScroll/HideOnScroll";

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
                      input: classes.inputInput,
                    }}
                  />
                </div>

                <IconButton
                  edge="end"
                  className={classes.button}
                  onClick={handleUserLogout}
                >
                  <MeetingRoom />
                </IconButton>
              </>
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
              <Link to="/statistics">
                <IconButton edge="end" className={classes.button}>
                  <Equalizer />
                </IconButton>
              </Link>
            ) : null}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}
