import { handleReturningUserAction } from "./actions/userActions";
import "fontsource-roboto";
import "./App.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar } from "./components/Navbar";
import { CssBaseline } from "@material-ui/core";
import { ErrorBar } from "./components/ErrorBar";
import { Loading } from "./components/Loading";
import { LoginPage } from "./components/LoginPage";

interface AppProps {
  handleReturningUser(): void;
}

function _App(props: AppProps) {
  const { handleReturningUser } = props;

  useEffect(() => {
    handleReturningUser();
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <LoginPage />
      <ErrorBar />
      <Loading />
    </>
  );
}

const mapDispatchToProps = {
  handleReturningUser: handleReturningUserAction,
};

const App = connect(null, mapDispatchToProps)(_App);

export default App;
