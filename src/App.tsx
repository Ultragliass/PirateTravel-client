import {
  handleReturningUserAction,
  loginUserAction,
} from "./actions/userActions";
import { IState } from "./models/state";
import "fontsource-roboto";
import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar } from "./components/Navbar";
import {
  CssBaseline,
  Backdrop,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { ErrorBar } from "./components/ErrorBar";

interface AppProps {
  handleReturningUser(): void;
  loginUser(username: string, password: string): void;
  isLoading: boolean;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
  },
}));

function _App(props: AppProps) {
  const { isLoading, handleReturningUser } = props;

  const classes = useStyles();

  useEffect(() => {
    props.loginUser("ass", "bass");
  }, []);

  return (
    <>
      <CssBaseline />

      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Navbar />

      <ErrorBar />
    </>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.isLoading,
    error: state.error,
  };
};

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
  loginUser: loginUserAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
