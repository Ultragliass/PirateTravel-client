import { HideOnScroll } from "../HideOnScroll/HideOnScroll";
import { useNavbarStyles } from "./styles";
import React, { ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Typography,
  Tooltip,
  Button,
} from "@material-ui/core";
import { Search, Equalizer, MeetingRoom } from "@material-ui/icons";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  logoutUser(): void;
  handleInputChange(e: ChangeEvent<HTMLInputElement>): void;
  value: string;
}

export function _Navbar(props: NavbarProps) {
  const classes = useNavbarStyles();
  const { isLoggedIn, isAdmin, logoutUser, value, handleInputChange } = props;

  const handleUserLogout = (): void => {
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
                    value={value}
                    onChange={handleInputChange}
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
                <Link to="/" className={classes.link}>
                  <Tooltip title="Login">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                    >
                      Login
                    </Button>
                  </Tooltip>
                </Link>

                <Link to="/register" className={classes.link}>
                  <Tooltip title="Register">
                    <Button
                      variant="outlined"
                      color="default"
                      className={classes.button}
                    >
                      Register
                    </Button>
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
